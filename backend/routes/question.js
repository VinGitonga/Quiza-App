import express from 'express'
import questionCtrl from '../controllers/question.js'
import quizaCtrl from '../controllers/quiza.js'
import authCtrl from '../controllers/auth.js'

const router = express.Router();

router.route('/create/:quizaId')
   .post(questionCtrl.createQuestion)

router.route('/list/by/:quizaId')
   .get(authCtrl.requireSignin, questionCtrl.listQuestions)

router.route('/update/:questionId')
   .put(authCtrl.requireSignin, authCtrl.isAdmin, questionCtrl.updateQuestion)

router.route('/delete/:questionId')
   .delete(authCtrl.requireSignin, authCtrl.isAdmin, questionCtrl.removeQuestion)

router.param('questionId', questionCtrl.fetchQuestionById)
router.param('quizaId', quizaCtrl.quizaById)

export default router;