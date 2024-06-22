const express=require(`express`)
const router=express.Router()
router.use(`/v1/api/product`,require('./product'))
router.use(`/v1/api/rbac`,require(`./rbac`))
router.use(`/v1/api/access`,require(`./access`))
router.use(`/v1/api/apikey`,require(`./apiKey`))
module.exports=router