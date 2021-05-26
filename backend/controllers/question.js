/* eslint-disable import/no-anonymous-default-export */
import Question from '../models/question.js'


const removeQuestion = async(req, res)=>{
    try {
        let question = req.question;
        let result = await question.remove()
        res.json(result)
    } catch (err) {
        res.status(400).json({
            message:'Could not delete'
        })
    }
}

/**
 * fetch all the questions of a particular quiz
 */

const listQuestions = async(req, res)=>{
    try {
        let quiza = req.quiza
        let quizaId = quiza._id
        let questions = await Question.find({quizaId: quizaId})
        res.json(questions)
    } catch (err) {
        console.log(err)
    }
}

/**
 * Create new question
 */


const createQuestion = async(req,res)=>{

    let quiza = req.quiza;
    let quizaId = quiza._id;

    console.log(req.body)

    let question = new Question({
        quizaId: quizaId,
        description: req.body.description,
        options: req.body.options,
        correctAnswer: req.body.correctAnswer
    })

    try {
        let result = await question.save()
        return res.json(result)
    } catch (err) {
        console.log(err)
    }
}


/**
 * Update question
 */

const updateQuestion = async(req, res)=>{
    let question = req.question;

    question.description = req.body.description
    question.options = req.body.options
    question.correctAnswer = req.body.correctAnswer

    try{
        let result = await question.save()
        return res.json(result)
    }catch(err){
        console.log(err)
    }
}

/**
 * fetch question by id
 */

const fetchQuestionById = async(req, res, next, id)=>{
    try {
        let question = await Question.findById(id)
        if(!question){
            return res.status(404).json({
                message:'Question not found'
            })
        }
        

        req.question = question;
        next()
    } catch (err) {
        return res.status(400).json({
            message:'Could not retrieve question'
        })
    }
}


export default {
    createQuestion,
    updateQuestion,listQuestions,removeQuestion,fetchQuestionById
}