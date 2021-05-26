/* eslint-disable import/no-anonymous-default-export */
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from '../config/config.js'

const signin = async(req, res)=>{
    try {
        let user = await User.findOne({
            'email':req.body.email
        })

        if(!user){
            return res.status(401).json({
                message:'User not found'
            }) 
        }


        if(!user.authenticate(req.body.password)){
            return res.status(401).json({
                message:"Email or password dont match"
            })
        }

        const token = jwt.sign({
            _id:user._id,
        }, config.jwtSecret)

        res.cookie("t", token,{
            expire: new Date() + 9999
        })

        return res.json({
            token,
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                role: user.role
            }
        })

    } catch (err) {
        console.log(err)
    }
}



const requireSignin = expressJwt({
    secret: config.jwtSecret,
    requestProperty:'profile',
    algorithms:['HS256']
})


const hasAuthorization = async(req, res, next)=>{
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id
    if(!authorized){
        return res.staus(403).json({
            message:'User not authorized'
        })
    }
    next()
}


const protect = async(req, res, next)=>{
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, config.jwtSecret)
            req.profile = await User.findById(decoded.id).select('-password')

            next()
        } catch (err) {
            console.log(err)
            res.status(401).json({
                message:'Not authorized, token failed'
            })
        }
    }
}


const isAdmin = async(err, req, res, next)=>{
    const isAdmin = req.profile && req.profile.isAdmin
    if(err){
        console.log(err)
    }

    if(!isAdmin){
        return res.status(403).json({
            message:'User not admin'
        })
    }

    next()
}

export default {
    protect, isAdmin,signin,requireSignin,hasAuthorization
}