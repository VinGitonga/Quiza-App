import express from 'express'

import quizCtrl from '../controllers/quiz.js'
import authCtrl from '../controllers/auth.js'
import userCtrl from '../controllers/user.js'

const router = express.Router()

router.route('/create')
   .post(authCtrl.protect, quizCtrl.createQuiz)

router.route('/save')
   .post(quizCtrl.saveQuiz)

router.route('/list')
   .get(authCtrl.requireSignin, quizCtrl.listQuizzes)

router.route('/check/:quizId/by/:userId')
   .post(authCtrl.requireSignin, quizCtrl.checkQuiz)

router.route('/start/:quizId/by/:userId')
   .patch(authCtrl.requireSignin, quizCtrl.startQuiz)

router.route('/restart/:quizId')
   .patch(authCtrl.requireSignin, quizCtrl.restartQuiz)

router.route('/close/:quizId')
   .patch(authCtrl.requireSignin, quizCtrl.closeQuiz)

router.route('/:quizId')
   .delete(authCtrl.requireSignin, authCtrl.isAdmin, quizCtrl.removeQuiz)

router.route('/update/:quizId/by/:userId')
   .put(authCtrl.requireSignin, authCtrl.isAdmin, quizCtrl.updateQuiz)

router.route('/enroll/:quizId/by/:userId')
   .patch(authCtrl.requireSignin, quizCtrl.enrollToQuiz)

router.route('/unenroll/:quizId')
   .patch(authCtrl.requireSignin, quizCtrl.unenrollFromQuiz)

router.route('/reset/:userId')
   .patch(authCtrl.requireSignin, quizCtrl.resetQuiz)

router.route('/response/student/:quizId')
   .get(authCtrl.requireSignin, quizCtrl.fetchResponses)

router.route('/list/enrolled/:userId')
   .get(authCtrl.requireSignin, quizCtrl.fetchEnrolledQuizzes)

router.route('/:quizId')
   .get(quizCtrl.getQuizById)

router.route('/details/:quizId')
   .get(quizCtrl.detailsQuiz)

router.route('/list/author/quizes/:userId')
   .get(authCtrl.requireSignin, quizCtrl.quizListByAuthor)

router.route('/list/student/quizes/:userId')
   .get(authCtrl.requireSignin, quizCtrl.quizListStudent)

router.param('quizId', quizCtrl.fetchById)
router.param('userId', userCtrl.userById)

export default router;