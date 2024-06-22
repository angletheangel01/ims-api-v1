const mongoose=require(`mongoose`)
const {host,database_name,database_port}=require(`../config/config.mongoDB`)
const URI=`${host}:${database_port}/${database_name}`
class Database{
    constructor(){
        if(!Database.instance){
            this.connect()
            Database.instance=this
        }
        return Database.instance
    }
    connect(){
        mongoose.set('debug',true),
        mongoose.set('debug',{color:true})
        const mongoConnect=async ()=>{await mongoose.connect(URI)}
        mongoConnect().catch(err=>console.log(err)).then(()=>console.log(`MongoDB Database Connected`))
    }
    static getInstance(){
        if(!Database.instance){
            Database.instance=new Database()
        }
        return Database.instance
    }
}
module.exports=Database.getInstance()