/* eslint-disable no-sequences */
/* eslint-disable no-use-before-define */
import Quiza from '../models/quiza.js'
import User from '../models/user.js'
import {nanoid} from 'nanoid'
import formidable from "formidable";
//import mongoose from 'mongoose'
import Question from '../models/question.js'
import redis from 'redis'
import Attempt from '../models/attempt.js'
import config from '../config/config.js'

const REDIS_PORT = 6379

const client = redis.createClient({
    host: config.REDIS_HOSTNAME,
    port: config.REDIS_PORT,
    password: config.REDIS_PASSWORD
})

const {IncomingForm} = formidable

const createQuiza = async(req, res)=>{
    let form = IncomingForm()
    var user = req.profile;

    form.parse(req, async(err, fields)=>{
        if(err){
            console.log(err)
        }

        let quiza = new Quiza({
            name: fields.name,
            duration: fields.duration,
            authorId: user._id,
            quizaCode:nanoid(10),
            description: fields.description
        })

        let quizaId = quiza._id;

        if(user){
            user.quizas.push(quizaId)
            await user.save()
        }

        try {
            let result = await quiza.save()
            res.json(result)
        } catch (err) {
            return res.status(400).json({
                message:'Unable to save the Quiza'
            })
        }
    })
}

const listQuizas = async(req, res)=>{
    try {
        let quizas = await Quiza.find()
        res.json(quizas)
    } catch (err) {
        return res.status(400).json({
            message:`Unable to fetch quizas due to: ${err}`
        })
    }
}

const removeQuiza = async(req, res)=>{
    try {
        let quiza = req.quiza;
        let deletedQuiza = await quiza.remove()
        res.json(deletedQuiza)
    } catch (err) {
        return res.status(400).json({
            message:`Unable to remove Quiza due to ${err}`
        })
    }
}

const updateQuiza = async(req, res)=>{
    let form = IncomingForm()
    form.parse(req, async(err, fields)=>{
        if(err){
            console.log(err)
        }

        let quiza = req.quiza;

        quiza.duration = fields.duration
        quiza.name = fields.name
        quiza.description = fields.description

        try {
            let result = await quiza.save()
            res.json(result)
        } catch (err) {
           console.log(err)
        }
    })
}

const quizaById = async(req, res, next, id)=>{
    try {
        let quiza = await Quiza.findById(id);
        if(!quiza){
            return res.status(404).json({
                message:'Quiza not found'
            })
        }

        req.quiza = quiza;
        next()
    } catch (err) {
        return res.status(400).json({
            message:`Could not fetch due to ${err}`
        })
    }
}

const detailsQuiza = async(req, res)=>{
    try {
        let quiza = req.quiza
        res.json(quiza)
    } catch (err) {
        return res.status(400).json({
            message:'Could not retrieve the quiza'
        })
    }
}

const enroll = async(req, res)=>{
    try {
        var quiza = req.quiza;
        var user = req.profile;
        var quizaId = quiza._id;
        console.log(quiza)
        /**
         * Verify if the user is already enrolled to the quiza b4 enrolling
         */
        
       
        var userId = user._id;
        //var quiz = await Quiza.findById(quizaId);

        for(let i = 0; i < quiza.usersEnrolled.length; i++){
            if(quiza.usersEnrolled[i].userId.equals(userId)){
                return res.status(409).json({
                    message:'Already Enrolled'
                })
            }
        } 

        
        //var quizaId = quiza._id;

        await Quiza.updateOne(
            {_id: quizaId},
            {$push: {usersEnrolled: {userId}}}
        ).then(async(result)=>{
            await User.updateOne(
                {_id: userId},
                {$push: {quizasEnrolled: {quizaId}}}
            ).then(async(result2)=>{
                return res.status(200).json({
                    message:'Enrolled to Kier'
                })
            }).catch(err=>{
                return res.status(400).json({
                    message:`Something went wrong due to ${err}`
                })
            })
        }).catch(err=>{
            return res.status(400).json({
                message: `Error occured due to ${err}`
            })
        })
    } catch (err) {
        console.log(err)
    }
}

const unenroll = async(req, res)=>{
    try {
        
        var quiza = req.quiza
        var user = req.profile

        var numQuizas = user.quizasEnrolled.length
        var userId = user._id;
        var quizaId = quiza._id

        /*for(let i =0; i < numQuizas; i++){
            if(user.quizasEnrolled[i].quizaId === quizaId){
                user.quizasEnrolled.pull(quizaId)
                quiza.usersEnrolled.pull(userId)

                try {
                    await user.save()
                    await quiza.save()
                    res.sendStatus(201)
                } catch (err) {
                    console.log(err)
                }
            }
        }*/

        for(let i = 0; i < numQuizas; i++){
            if(user.quizasEnrolled[i].quizaId === quizaId){
                await User.findOne(
                    {_id: userId},
                    {$pull: {quizasEnrolled: {quizaId: quizaId}}}
                ).then(async(result)=>{
                    await Quiza.updateOne(
                        {_id: quizaId},
                        {$pull: {usersEnrolled: {userId: userId}}}
                    ).then(result2=>{
                        return res.status(201).end()
                    }).catch(err=>{
                        return res.status(400).json({
                            message: `Something went wrong due to ${err}`
                        })
                    })
                }).catch(err=>{
                    return res.status(400).json({
                        message: `Error due to ${err}`
                    })
                })
            }
        }
    } catch (err) {
        console.log(err)
    }
}


const unenrollFromQuiza = async(req, res)=>{
    //var quiza = req.body.quiza;
    var user = req.profile;

    var numQuizas = user.quizasEnrolled.length;
    var quizaId = req.body.quizaId;
    var userId = user._id
    var quiza = await Quiza.findById(quizaId)
    console.log(quiza)
    console.log(user + 'out')
    //console.log(user.quizasEnrolled[1].quizaId)
    console.log(quizaId)


    for(let i =0; i < numQuizas; i++){
        if(user.quizasEnrolled[i].quizaId.equals(quizaId)){
            try {
                await user.save()
                await quiza.save()
                await User.findByIdAndUpdate(userId,{
                    $pull:{
                        quizasEnrolled:{quizaId:quizaId}
                    }
                }, {safe: true})
                await Quiza.findByIdAndUpdate(quizaId, {
                    $pull:{
                        usersEnrolled:{userId:userId}
                    }
                })
                console.log(user + 'in')
                res.status(201).json(quiza)
            } catch (err) {
                console.log(err)
            }
        }
    }
}

const fines = async(req, res, next)=>{
    var user = req.profile;
    await User.findById(user._id)
       .then(async(result)=>{
           var numQ = result.quizasEnrolled.length;
           var flag = 0;

           for (let i = 0; i < numQ; i++){
               if((result.quizasEnrolled[i].quizaId).equals(req.body.quizaId)){
                   console.log(result.quizasEnrolled[i])
                   flag = 1;
                   var currUser = user._id

                   await User.updateOne(
                       {_id: currUser},
                       {$pull: {quizasEnrolled: {quizaId: req.body.quizaId}}}
                   ).then(async (result2)=>{
                       await Quiza.updateOne(
                           {_id: req.body.quizaId},
                           {$pull:{usersEnrolled:{userId: user._id}}}
                       ).then((result3)=>{
                           res.status(200).json(result3)
                       }).catch((err)=>{
                           console.log(err+'err 1')
                       })
                   }).catch((err)=>{
                       console.log(err+'errr 2')
                   })
               }
           }

           if(flag === 0){
               console.log('nope')
               return res.status(400).json({
                   message:"You are not part of the Quiza"
               })
           }
       }).catch(err=>{
           console.log(err)
       })
}

/**
 * Fetch enrolled quizas 
 */

const fetchEnrolledQuizas = async(req, res)=>{
    try {
        var user = req.profile;
        var userId = user._id;

        var query = {
            userId: userId
        }

       let quizas = await Quiza.find(
           {'usersEnrolled.userId':query.userId}
       )

       res.json(quizas)
       
    } catch (err) {
        console.log(err)
    }
}

const listByAuthor = async(req,res)=>{
    try {
        var user = req.profile;
        var userId = user._id;

        var query = {
            userId: userId
        }

        let quizas = await Quiza.find(
            {authorId: query.userId}
        )

        res.json(quizas)
    } catch (err) {
        console.log(err)
    }
}

/**
 * Start Quiza and save the questions in the cache database for 1 hr and auto destroy
 */

const startQuiza = async(req, res)=>{
    try {
        let quiza = req.quiza;
        var query = {
            quizaId: quiza._id
        }

        let questions = await Question.find({
            quizaId: query.quizaId
        })

        var user = req.profile;
        var flag = 0;


        /**
         * Check if the user is enrolled in the quiza
         */
        for(let i =0; i < user.quizasEnrolled.length; i++){
            if(user.quizasEnrolled[i].quizaId.equals(quiza._id)){
                flag = 1
            }
        }

        /**
         * Return false if the user is not enrolled in the quiza
         */

        if(flag === 0){
            return res.status(409).json({
                message:'You are not enrolled in this quiza'
            })
        }

        /**
         * Save the questions in the cache database using the userId as the key
         */
        client.setex(user._id.toString(), 3600, JSON.stringify(questions))

        var data = []
        for(let i = 0; i < questions.length; i++){
            var object = {
                quizaId: questions[i].quizaId,
                description: questions[i].description,
                options: questions[i].options,
                questionId: questions[i]._id
            }
            data.push(object)
        }

        /**
         * Return the response to the frontend
         */

        await res.status(200).json({
            data,
            duration: quiza.duration,
            status: quiza.quizaStatus
        })

    } catch (err) {
        console.log(err)
    }
}

const resetQuiza = async(req, res)=>{
    var user = req.profile;
    client.del(user._id.toString(), function(err, result){
        if(err){
            return res.status(400).json({
                message:`Error removing cache data due to ${err}`
            })
        }
        console.log(result)
        return res.status(200).json({
            message:'Your Time is up, Try Again'
        })
    })
}

/**
 * This functions receives the answers from the frontend and checks against the correctAnswers.
 * Thereafter it saves the results in for the user in User, Quiza and Attempt Documents
 * Attempt is necessary for saving each attempt the user takes in the Quiza which can be 
 * fetched anytime and easily.
 * @param {*} req 
 * @param {*} res 
 */


const checkQuiza = async(req, res)=>{
    const que_data = req.body.questions;
    var quiza = req.quiza;
    var quizaId = quiza._id;
    const timeEnded = req.body.timeEnded;
    const timeStarted = req.body.timeStarted;
    var responses = []
    var score = 0;
    var user = req.profile;
    var userId = user._id;
    var attemptId = nanoid(10)

    /**
     * Fetch the questions using userId from the redis cache database server
     */

    client.get(userId.toString(), async(err, data)=>{
        if(err){
            return res.status(400).json({
                message:'Error fetching cache'
            })
        }

        /**
         * Parse through the data saved in redis
         */
        var dataQues = JSON.parse(data)

        if(data !== null){
            for (let i = 0; i < dataQues.length; i++){
                /**
                 * Now Start marking by cross checking the selected option and the correct answer
                 */
                if(que_data[i].selectedOption === dataQues[i].correctAnswer){
                    score +=1
                }

                /**
                 * Save the info in an object and then push into an array
                 */
                var object = {
                    description:  dataQues[i].description,
                    selected: que_data[i].selectedOption,
                    quesId: que_data[i].quizaId,
                    correctAnswer: dataQues[i].correctAnswer,
                    options: dataQues[i].options
                }
                responses.push(object)
            }

            /**
             * Update the user by pushing the responses, marks, quizaId and the rest
             */
            await User.updateOne(
                {_id: userId},
                {
                    $push: {
                        quizasGiven:{
                            quizaId,
                            score,
                            responses,
                            timeEnded,
                            timeStarted,
                            attemptId
                        }
                    }
                }
            ).then(async(result1)=>{
                /**
                 * Update the quiza with the same
                 */
                await Quiza.updateOne(
                    {_id: quizaId},
                    {
                        $push:{
                            usersParticipated:{
                                userId: userId,
                                score,
                                responses,
                                timeEnded,
                                timeStarted,
                                attemptId
                            }
                        }
                    }
                ).then(async(result2)=>{
                    /**
                     * Create new attempt with both the quizaId and userId and specId
                     * Spec Id is a unique code for every attempt the user makes.
                     */
                   let attempt = new Attempt({
                       quizaId: quizaId,
                       userId: userId,
                       specId: attemptId
                   })

                   await attempt.save()
                }).then(async(result)=>{
                    res.json(result)
                })
            })
        }else {
            console.log('No data honey')
        }
    })
}

/**
 * Fetch Student's Responses 
 */
const fetchResponses = async(req, res)=>{
    try {
        let quiza = req.quiza;
        var query = {
            quizaId: quiza._id
        }

        let attempts = await Attempt.find({
            'quizaId':query.quizaId
        })

        /**
         * At this point we loop through the quiza's usersParticipants and attempst as well
         * We point against which attempt's specId corresponds we the participants attemptId
         * Thereafter we dispatch the results to the frontend
         */
        let i ,j ;
        for( i= 0; i < quiza.usersParticipated.length; i++){
            for(j = 0; j < attempts.length; j++){
                if(attempts[j].specId === quiza.usersParticipated[i].attemptId){
                    var attemptInfo = quiza.usersParticipated[i]
                }
            }
        }

        if(attemptInfo){
            res.json(attemptInfo)
        }
    } catch (err) {
        return res.status(400).json({
            message:"Couldn't fetch the responses"
        })
    }
}

/**
 * Fetch quiza's attempts
 */
const listQuizaSubmissions = async(req, res)=>{
    try {
        let quiza = req.quiza;

        const users = await Quiza
                        .findById(quiza._id)
                        .populate({
                        path:"usersParticipated",
                        populate:{
                            path:"userId",
                            select:{name: 1}
                        }
                        }).exec()
        
        if(!users){
            res.status(400).json({
                message:'Some error occured while fetching'
            })
        }

        const usersResults = users.usersParticipated;
        res.status(200).json(usersResults)
    } catch (err) {
        console.log(err)
    }
}

const listMySubmissions = async(req, res)=>{
    try {
        let user = req.profile;
        
        const quizas = await User.findById(user._id)
            .populate({
                path:"quizasGiven",
                populate:{
                    path:"quizaId"
                }
            }).exec()

        if(!quizas){
            res.status(400).json({
                message:'Couldnt fetch your submissions'
            })
        }

        console.log(quizas.quizasGiven)

        res.status(200).json(quizas.quizasGiven)
    } catch (err) {
        console.log(err)
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    createQuiza,updateQuiza,removeQuiza,listQuizas,quizaById,detailsQuiza,enroll, unenroll,fetchEnrolledQuizas,unenrollFromQuiza,fines,listByAuthor,
    startQuiza, resetQuiza, checkQuiza, fetchResponses, listQuizaSubmissions, listMySubmissions
}

