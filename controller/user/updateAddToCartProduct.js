const addToCartModel = require("../../models/cartProduct")

const updateAddToCartProduct = async(req,res)=>{
    try{
        const currentUserId = req.userId
        const addToCardProductId = req?.body?._id
        const qty =req.body.quantity

        const updateProduct = await addToCartModel.updateOne({_id: addToCardProductId},{
            ...(qty && {quantity : qty})
        })

        res.json({
            message : "Product Updated",
            data : false,
            error : false,
            success : true
        })

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = updateAddToCartProduct