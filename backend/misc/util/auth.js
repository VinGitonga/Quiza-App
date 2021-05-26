import jwt from 'jsonwebtoken'

const generateJwt = async(user, next)=>{
    try {
        var payload = {userId: user._id}
        var token = await jwt.sign(payload, process.env.SECRET)
        return token;
    } catch (err) {
        next(err)
    }
}

const validateJwt = async(req, res, next)=>{
    try {
        var token = req.headers["authorization"] || "";
        if(!token && !req.isGuestAllowed){
            return res.status(401).json({message:'token is required'})
        }

        var payload = await jwt.verify(token, process.env.SECRET)
        req.userId = payload.userId
        next()
    } catch (err) {
        if(req.isGuestAllowed){
            next()
        }else{
            return res.status(401).json({
                error: err.message || "Something went wrong Kierstan"
            })
        }
    }
}

const allowGuest = async(req, res, next)=>{
    req.isGuestAllowed = true
    next()
}

export default {
    generateJwt, validateJwt,allowGuest
}