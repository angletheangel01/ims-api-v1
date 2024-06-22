const skuModel = require("../model/sku.model");

class SKUService{
   static addSku=async(spu_id,sku_list)=>{
        function generateUniqueId() {
            const randomPart = Math.random().toString(36).substring(2, 15);
            const timestampPart = Date.now().toString(36);
            return `${randomPart}-${timestampPart}`;
          }
        const skusList=sku_list.map((sku)=>{
            return {...sku,spu_id:spu_id,sku_id:`${spu_id}_${generateUniqueId()}`}
        })
        await skuModel.insertMany(skusList)
    }
}
module.exports=SKUService