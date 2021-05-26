import userCtrl from '../controllers/user.js'
import express from 'express'

const router = express.Router()

router.route('/create')
    .post(userCtrl.createUser)

router.route('/update/:userId')
   .put(userCtrl.update)

router.route('/details/:userId')
   .get(userCtrl.read)

router.route('/list')
   .get(userCtrl.list)

router.route('/image/:userId')
   .get(userCtrl.photo)

router.param('userId', userCtrl.userById)


export default router;