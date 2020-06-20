process.env.PORT = process.env.PORT || 3000

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//process.env.BERIS = true

process.env.DB = (process.env.BERIS)? 'mongodb://localhost:27017/uaaulavirtual' : 'mongodb+srv://uaa-user:Fm8U2Yjn7j3aYWxl@cluster0-h8wwc.mongodb.net/uaaulavirtual?retryWrites=true&w=majority'

process.env.JWT_SEED =  process.env.JWT_SEED || 'SECRET'