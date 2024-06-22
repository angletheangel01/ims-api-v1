const { SuccessResponse, CreatedResponse } = require("../core/success.response")
const ProductService = require("../service/product.service")

class ProductController{
    addProduct=async(req,res,next)=>{
        new CreatedResponse({
            message:'add product success',
            metadata:await ProductService.addProduct(req.body)

        }).send(res)
    }
    listProducts=async(req,res,next)=>{
        new SuccessResponse({
            message:'list success`',
            metadata:await ProductService.listProducts()

        }).send(res)
    }
}

module.exports=new ProductController()