const { BAD_REQUEST } = require("../core/error.response")
const spuModel = require("../model/spu.model")
const SKUService = require("./skus.service")
require(`../core/error.response`)
require(`./skus.service`)
class ProductService{
    static async addProduct({
        spu_id,
        spu_name,
        spu_category,
        spu_brand,
        spu_description,
        spu_thumbnail,
        spu_attributes,
        spu_variations,
        sku_list
    }){
        const product=await spuModel.create({
            spu_id,
            spu_name,
            spu_category,
            spu_brand,
            spu_description,
            spu_thumbnail,
            spu_attributes,
            spu_variations
        })
        if(product && sku_list.length>0){
           await SKUService.addSku(spu_id,sku_list)
        }else throw new BAD_REQUEST(`add product fail`)
        return product
    }
    static listProducts=async()=>{
        return await spuModel.find()
    }
    
}

module.exports=ProductService