import authCtrl from '../controllers/auth.js'
import express from 'express'

const router = express.Router()

router.route('/signin')
   .post(authCtrl.signin)

export default router;