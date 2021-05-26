/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-use-before-define */
/* eslint-disable no-sequences */
import Quiz from "../models/quiz.js";
import User from '../models/user.js'
import formidable from 'formidable'
import Question from '../models/question.js'
import redis from 'redis'
import {nanoid} from 'nanoid'
import Attempt from '../models/attempt.js'

const {IncomingForm} = formidable
const REDIS_PORT = 6379;

const client = redis.createClient(REDIS_PORT)


const createQuiz = async(req, res)=>{
    let form = IncomingForm()
    form.parse(req, async(err, fields)=>{
        console.log(fields)
        if(err){
            return ''
        }

        let newQuiz = new Quiz({
            quizName: fields.quizName,
            adminId:fields.userId,
            quizDuration:fields.quizDuration,
            quizCode: nanoid(10),
        })
        let quizId = newQuiz._id

        await User.updateOne(
            {_id: fields.userId},
            {$push:{quizzes:{quizId}}}
        )

        try {
            let result = await newQuiz.save()
            res.status(200).json(result)
            console.log(result)
            console.log('success')
        } catch (err) {
            console.log(err)
        }
    })
}

const saveQuiz = async(err, req, res)=>{
    if(err){
        console.log(err)
    }

    console.log(req.body)

    //let {quizName, userId, quizDuration} = req.body
    let exam = new Quiz({
        quizName: req.body.quizName,
        adminId: req.body.userId,
        quizCode: nanoid(10),
        quizDuration: req.body.quizDuration
    })

    let user1 = await User.findById(req.body.userId)

    try {
        let result = await exam.save()
        if(user1){
            user1.quizzes.push(result._id)
            await user1.save()
        }
        res.json(result)
    } catch (err) {
        console.log(err)
    }
}

const listQuizzes = async(req, res)=>{
   try {
       const quizzes = await Quiz.find({})
       res.json(quizzes)
   } catch (err) {
       return res.status(400).json({
           message:'Failed to retrieve the quizzes'
       })
   }
}

//Enroll / get access to a quiz

const enrollToQuiz = async(req, res)=>{
    try {
        var quiz = req.quiz;
        /**
         * Verify if the user is already enrolled to the quiz
         * before enrolling
         */
        for(let i = 0; i < quiz.usersEnrolled.length; i++){
            if(quiz.usersEnrolled[i]._id === req.profile._id){
                return res.status(409).json({
                    message:'Already enrolled'
                })
            }
        }

        const userId = req.profile._id;
        const quizId = quiz._id;
        await Quiz.updateOne(
            {_id: quizId},
            {$push: {usersEnrolled: {userId}}}
        ).then(async(result)=>{
            await User.updateOne(
                {_id: userId},
                {$push: {quizzesEnrolled:{quizId}}}
            ).then(async(result2)=>{
                await res.status(200).json({
                    message:'Enrolled to Kier'
                })
            }).catch(err=>{
                return res.staus(400).json({
                    message:'Something went wrong' +err
                })
            })
        }).catch(err=>{
            return res.status(400).json({
                message:`Error ${err}`
            })
        })
    } catch (err) {
        console.log(err)
    }
}

const updateQuiz = async(req, res)=>{
    let form = IncomingForm()
    form.parse(req, async(err,fields)=>{
        if(err){
            return ''
        }

        let quiz = req.quiz;

        quiz.quizName = fields.quizName;
        quiz.quizDuration = fields.quizDuration;
        quiz.scheduledFor = fields.scheduledFor;

        try {
            let result = await quiz.save()
            res.json(result)
        } catch (err) {
            return res.status(400).json({
                message:'Something happened could not be updated'
            })
        }
    })
}

/**
 * Unenroll a student from a quiz
 * @param PATCH /api/quizzes/:quizId
 */


const unenrollFromQuiz = async(req, res)=>{
    try {
        let user = req.profile
        let quizId = req.quiz._id

        let numQuiz = user.quizzesEnrolled.length;

        for(let i = 0; i<numQuiz; i++){
            if(user.quizzesEnrolled[i].quizId === quizId){
                var currUser = req.profile._id

                await User.findOne(
                    {_id: currUser},
                    {$pull: {quizzesEnrolled: {quizId: quizId}}}
                )
                .then(result=>{
                    Quiz.updateOne(
                        {_id: quizId},
                        {$pull:{usersEnrolled:{userId:req.profile._id}}}
                    ).then(result3=>{
                        return res.status(200).json({
                            message:'Successfully unenrolled'
                        })
                    }).catch(err=>{
                        return res.status(400).json({
                            message:'Something wrong occurred'
                        })
                    })
                }).catch(err=>{
                    return res.status(400).json({
                        message:`Error Baby ${err}`
                    })
                })
            }
        }
    } catch (err) {
        await res.status(400).json({
            message:`Error mehn ${err}`
        })
    }
}


/**
 * Start quuiz
 */

const startQuiz = async(req, res)=>{
    try {
        let quiz = req.quiz;
        let questions = await Question.find({
            quizId:quiz._id
        })

        var user = req.profile;
        
        var flag = 0;
        //ensure that the quiz is open
        if(quiz.quizStatus === 'Open'){
            //ensure the time its scheduled for is up
            if(
                Date.now() >= Number(quiz.scheduledFor)
            ){
                for(let i = questions.length - 1; i > 0; i--){
                    const j = Math.floor(Math.random() * (i + 1))
                    [questions[i], questions[j]] = [questions[j], [questions[i]]]
                }

                var numEnrolled = user.quizzesEnrolled.length;

                //check if the user is enrolled first
                for(let i = 0; i < numEnrolled; i++){
                    if(user.quizzesEnrolled[i].quizId === quiz._id){
                        flag = 1
                    }
                }

                //return false if the user is not enrolled
                if(flag === 0){
                    return res.status(409).json({
                        message:'You are not enrolled in this quiz'
                    })
                }

                /**
                 * Now store the userId in the redis cache database together with the questions
                 */
                client.setex(user._id, 3600, JSON.stringify(questions))
                
                var data = []
                for(let i = 0; i < questions.length; i++){
                    var object = {
                        quizId : questions[i].quizId,
                        description: questions[i].description,
                        options: questions[i].options,
                        questionId: questions[i]._id
                    }
                    data.push(object)
                }

                await res.status(200).json({
                    message:`Quiz started for ${user.name}`,
                    data,
                    duration: quiz.quizDuration,
                    scheduledFor: quiz.scheduledFor,
                    quizStatus: quiz.quizStatus
                })
                
            }else{
                return res.status(200).json({
                    message:'Quiz has not been opened yet'
                })
            }
        }else{
            return res.status(400).json({
                message:'Quiz status is closed'
            })
        }

    } catch (err) {
        return res.status(400).json({
            message:`Some errored due to ${err}`
        })
    }
}


/**
 * Reset the quiz when the time is up for the quiz
 */

const resetQuiz = async(req, res)=>{
    var user = req.profile
    client.del(user._id, function(err, result){
        if(err){
            return res.status(400).json({
                message:'Error removing cache'
            })
        }
        console.log(result)
        return res.status(200).json({
            message:"Your Time is up, Try again"
        })
    })
}


//check for the answers as well as smashing it
const checkQuiz = async(req, res)=>{
    const que_data = req.body.questions;
    //const quiz = req.quiz;
    var quizId = req.quiz._id;
    const timeEnded = req.body.timeEnded
    const timeStarted = req.body.timeStarted;
    var responses = []
    var score = 0;
    var user = req.profile
    var userId = user._id

    var attemptId = nanoid(10)

    
    /**
     * Fetch the userId and questions from the redis cache database
     */
    client.get(req.profile._id, (err, data)=>{
        if(err){
            return res.status(400).json({
                message:'Error in cachin'
            })
        }

        //parse through the data saved in the redis database
        var dataQue = JSON.parse(data)

        if(data !== null){
            for(let i = 0; i < dataQue.length; i++){
                /**
                 * Check the answer from the frontend against the one saved in the
                 * redis database and increment the score
                 */
                if(que_data[i].selectedOption === dataQue[i].correctAnswer){
                    score += 1
                }

                /**
                 * save the info in a list then push into an array
                 */
                var object = {
                    description: dataQue[i].description,
                    selected: que_data[i].selectedOption,
                    quesId: que_data[i].quizId,
                    correctAnswer:dataQue[i].correctAnswer,
                    options:dataQue[i].options
                }

                responses.push(object)
            }

            /**
             * Update the user by pushing the responses,marks,quizId,timeStarted and timeEnded
             */
            User.updateOne(
                {_id: userId},
                {
                    $push:{
                        quizzesGiven:{
                            quizId,
                            marks:score,
                            responses,
                            timeEnded,
                            timeStarted,
                            attemptId
                        },
                    },
                },
            )
                .then(async(result)=>{
                    /**
                     * Update the quiz on the user details on the quiz taken results and responses
                     */
                    await Quiz.updateOne(
                        {_id: quizId},
                        {
                            $push:{
                                usersParticipated:{
                                    userId: userId,
                                    marks:score,
                                    responses,
                                    timeEnded,
                                    timeStarted,
                                    attemptId
                                },
                            },
                        },
                    )
                })
                .then(async (result23)=>{
                    /**
                     * Create new atttempt with both the userId and quizId and spec Id for reference purposes
                     */
                    let attempt = new Attempt({
                        quizId:quizId,
                        userId:userId,
                        specId:attemptId
                    })

                    await attempt.save()
                })
        }else{
            //if not data is found in the redis database return false 
            console.log('Could not find the question in the cache')
        }
    })
}
/**
 * Remove a quiz
 */

const removeQuiz = async(req, res)=>{
    try {
        let quiz = req.quiz;
        var numUsers = quiz.usersEnrolled.length;
        /**
         * Update all the users enrolled in the quiz by pulling all the quiz's details
         */
        for(let i = 0; i < numUsers; i++){
            var currentUser = quiz.usersEnrolled[i].userId;
            await User.updateOne(
                {_id: currentUser},
                {$pull: {quizzesEnrolled: {quizId: quiz._id}}}
            ).catch(err=>{
                res.status(400).json({
                    message:'Some error occured baby'
                })
            })
        }

        /**
         * Then delete all the questions associated with the quiz
         * and finally delete the quiz itself
         */
        await Question.deleteMany({quizId: quiz._id})
            .then(async(result3)=>{
                await Quiz.deleteOne({_id: quiz._id})
                  .then(result2=>{
                      res.status(200).json({
                          message:'Delete successfully'
                      })
                  }).catch(err=>{
                      res.status(400).json({
                          message:'Some error baby'
                      })
                  })
            })
       .catch(err=>{
               res.status(400).json({
                   message:'Error honey'
               })
           })
    } catch (err) {
        res.status(400).json({
            message:'Error honey cant you see'
        })
    }
}

/**
 * Restart a quiz
 */

const restartQuiz = async(req, res)=>{
    const quiz = req.quiz;
    quiz.quizStatus = 1;
    quiz.quizRestart = 1;
    await quiz.save()
       .then(result=>{
           res.status(200).json({
               message:'Quiz restarted'
           })
       }).catch(err=>{
           res.status(400).json({
               message :'Error on restart'
           })
       })
}

/**
 * Close the quiz due to time elapse and 
 * eventually quiz restart 
 */
const closeQuiz = async(req, res)=>{
    const quiz = req.quiz;
    //change the status and restart of the quiz
    quiz.quizStatus = 2;
    quiz.quizRestart = 0;
    await quiz.save()
       .then(result=>{
           res.status(200).json({
               message:'Quiz restarted'
           })
       }).catch(err=>{
           res.status(400).json({
               message:'error'
           })
       })
}

//fetch quiz by Id and append the quiz to req in order to be fetched easily
const fetchById = async(req, res, next, id)=>{
    try {
        var quiz = await Quiz.findById(id)
        if(!quiz){
            return res.status(404).json({
                message:'Could not retrieve the Quiz'
            })
        }

        req.quiz = quiz;
        next()
    } catch (err) {
        return res.status(400).json({
            message:'Could find the Quiz, sorry'
        })
    }
}

//fetch enrolled quizzes
const fetchEnrolledQuizzes = async(req, res)=>{
    try {
        var query = {
            userId: req.profile._id
        }
        let quizzes = await Quiz.find({
            'usersEnrolled.userId':query.userId
        })

        res.json(quizzes)
    } catch (err) {
        return res.status(400).json({
            message:'Unable to fetch the quizzes'
        })
    }
}

const fetchResponses = async(req, res)=>{
    try{
        let quiz = req.quiz
        var query = {
            quizId: quiz._id
        }
        let attempt = await Attempt.find({
            'quizId':query.quizId
        })

        let attemptCount = attempt.length

        let i,j;
        for(i = 0; i < quiz.usersParticipated.length; i++){
            for (j = 0; j < attemptCount; j++){
                if(attempt[j].specId === quiz.usersParticipated[i].attemptId){
                    var attemptInfo = quiz.usersParticipated[i]
                } 
            }
        }

        if(attemptInfo){
            res.json(attemptInfo)
        }
    }catch(err){
        return res.status(400).json({
            message:'Responses not found'
        })
    }
}

const getQuizById = async(req, res)=>{
    try {
        let quiz = req.quiz
        if(quiz){
            res.json(quiz)
        }
    } catch (err) {
        return res.status(404).json({
            message:'Could not retrive the quiz'
        })
    }
}

const detailsQuiz = async(req, res)=>{
    try {
        let quiz = req.quiz;
        res.json(quiz)
    } catch (err) {
        return res.status(404).json({
            message:'Could not retrieve the quiz details'
        })
    }
}

const quizListByAuthor = async(req,res)=>{
    try {
        let user = req.profile;
        var query = {
            userId: user._id
        }

        let quizzes = await Quiz.find({
            adminId:query.userId
        })

        if(quizzes){
            res.json(quizzes)
        }
    } catch (err) {
        return res.status(400).json({
            message:'Could not retrieve your quizzes'
        })
    }
}

const quizListStudent = async(req, res)=>{
    try {
        await User.findById(req.profile._id)
           .populate({
               path:'quizzesGiven',
               populate:{path:'quizId',populate:{path:'adminId'}}
           }).exec()
             .then(result=>{
                 res.status(200).json(result.quizzesGiven)
             })
    } catch (err) {
        return res.status(400).json({
            message:`Could not retrieve the quizzes due to ${err}`
        })
    }
}

export default {
    createQuiz,enrollToQuiz,unenrollFromQuiz,
    updateQuiz,startQuiz,resetQuiz,closeQuiz,fetchById,
    checkQuiz,removeQuiz,restartQuiz,listQuizzes,fetchEnrolledQuizzes,fetchResponses, getQuizById,
    detailsQuiz,quizListByAuthor, quizListStudent, saveQuiz
}