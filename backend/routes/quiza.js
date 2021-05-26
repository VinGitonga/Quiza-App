import quiza from '../controllers/quiza.js'
import user from '../controllers/user.js'
import express from 'express'

const router = express.Router()

router.route('/create/:userId')
   .post(quiza.createQuiza)

router.route('/list')
   .get(quiza.listQuizas)

router.route('/update/:quizId')
  .put(quiza.updateQuiza)

router.route('/:quizId')
   .delete(quiza.removeQuiza)

router.route('/details/:quizId')
   .get(quiza.detailsQuiza)

router.route('/enroll/:quizId/by/:userId')
   .patch(quiza.enroll)
   
router.route('/unenroll/:userId')
   .patch(quiza.fines)

router.route('/myenrolled/by/:userId')
   .get(quiza.fetchEnrolledQuizas)

router.route('/list/by/:userId')
   .get(quiza.listByAuthor)

router.route('/start/:quizId/by/:userId')
   .patch(quiza.startQuiza)

router.route('/reset/by/:userId')
   .patch(quiza.resetQuiza)

router.route('/check/:quizId/by/:userId')
   .post(quiza.checkQuiza)

router.route('/responses/:quizId')
   .get(quiza.fetchResponses)

router.route('/list/quiza/submissions/:quizId')
   .get(quiza.listQuizaSubmissions)

router.route('/list/users/submissions/:userId')
   .get(quiza.listMySubmissions)

router.param('quizId', quiza.quizaById)
router.param('userId', user.userById)

export default router