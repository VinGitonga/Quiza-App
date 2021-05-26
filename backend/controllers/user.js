/* eslint-disable import/no-anonymous-default-export */
import User from '../models/user.js'
import extend from 'lodash/extend.js'
import formidable from 'formidable'
import fs from 'fs'




const createUser = async(req, res)=>{
    const user = new User(req.body)
    try {
        await user.save()
        return res.status(200).json({
            message:'Successfully signed up'
        })
    } catch (err) {
        return res.status(400).json({
            message: err.toString()
        })
    }
}

/**
 * Get user via their id
 */

const userById = async(req, res, next, id)=>{
    try {
        let user = await User.findById(id)
        if(!user){
            return res.status(404).json({
                message:'User not found, sorry'
            })
        }

        req.profile = user;
        next()
    } catch (err) {
        return res.status(400).json({
            message:'Could not retrieve the user'
        })
    }
}


const read = async(req, res)=>{
    try {
        let user = req.profile;
        user.hashed_password = undefined
        user.salt = undefined
        user.image = undefined
        res.json(user)
    } catch (err) {
        return res.status(400).json({
            message:`Couldn't fetch the details due to ${err}`
        })
    }
}

const photo = async(req, res,next)=>{
    let user = req.profile
    if(user.image.data){
        res.set('Content-Type', user.image.contentType)
        return res.send(user.image.data)
    }
    next()
}

const update = async(req, res)=>{
    let form = new formidable.IncomingForm()
    var user = req.profile
    form.keepExtensions = true
    form.parse(req, async(err, fields, files)=>{
        if(err){
            return console.log(err)
        }
        console.log(fields)
        user = extend(user, fields)
        user.updated = Date.now()
        console.log(files)
        if(files.image){
            user.image.data = fs.readFileSync(files.image.path)
            user.image.contentType = files.image.type
        }

        try {
            let result = await user.save()
            console.log(result)
            res.json(result)
        } catch (err) {
            console.log(err)
        }
    })
}

/*const update = async(req,res)=>{
    try {
        let user = req.profile
        user = extend(user, req.body)
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    } catch (err) {
        return res.status(400).json({
            message:'Could not update your profile!!'
        })
    }
}*/

const list = async(req, res)=>{
    try {
        let users = await User.find()
        res.json(users)
    } catch (err) {
        return res.status(400).json({
            message:'Unable to fetch Users'
        })
    }
}



export default {
    createUser, userById, read, update,photo,list
}