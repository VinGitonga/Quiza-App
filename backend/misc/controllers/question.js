import Quiz from '../models/quiz'
import Question from '../models/question'
import validity from '../util/validatorModule'

const createQuestion = async(req, res, next)=>{
    var question = req.body.question;
    try {
        if(!validity.isValidQuestion(question)){
            return res.status(400).json({
                message:'Invalid Question'
            })
        }

        if(!question.quizId){
            return res.status(404).json({
                message:'Quiz not found'
            })
        }

        var quiz = await Quiz.findById(question.quizId)

        if(!quiz){
            return res.status(404).json({
                message:'Quiz not found in db'
            })
        }

        question.authorId = req.userId;

        var newQuestion = await Question.create(question)

        quiz.questions.push(newQuestion._id)
        quiz.save()

        res.json({success:true, question: newQuestion})
    } catch (err) {
        next(err)
    }
}


const updateQuestion = async(req, res, next)=>{
    var qId = req.params.id
    try {
        var {question} = req.body
        if(!req.body.question){
            return res.status(404).json({
                message:'Question not found baby'
            })
        }
        if(!validity.isValidQuestion(question)){
            return res.status(404).json({
                message:'Invalid Question'
            })
        }

        if(question.authorId !== req.userId){
            return res.status(403).json({
                message:'You are not authorized to update the question'
            })
        }
    } catch (err) {
        
    }
}