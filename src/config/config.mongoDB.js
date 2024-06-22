require(`dotenv`).config()

const dev={
        host:process.env.DEV_HOST,
        port:process.env.DEV_PORT,
        database_name:process.env.DEV_DATABASE_NAME,
        database_port:process.env.DEV_DATABASE_PORT
    }
const production={
        host:process.env.PROD_HOST,
        port:process.env.PROD_PORT,
        database_name:process.env.PROD_DATABASE_NAME,
        database_port:process.env.PROD_DATABASE_PORT
    }
module.exports=process.env.NODE_ENV==='production'?production:dev