const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3001,
    jwtSecret: process.env.JWT_SECRET || 'AmWaitingForMyKierstan',
    mongoUri:process.env.MONGODB_URI ||
       process.env.MONGO_HOST ||
        'mongodb://' + (process.env.IP || 'localhost') + ':' +
        (process.env.MONGO_PORT || '27017') +
        '/erica2025'
    ,
    REDIS_HOSTNAME: process.env.REDIS_HOSTNAME,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD
}

export default config;