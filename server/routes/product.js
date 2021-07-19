const express = require("express");
const router = express.Router();
const Product = require("../model/Product");

router.post(
    "/add",
    async (req, res) => {
        console.log('A product of following info is trying to reach to database', req.body);
        const {
            title,
            cost
        } = req.body;
        try {
            let product = await Product.findOne({
                title
            });
            if (product) {
                // product is already available, check it's price
                if (cost < product.cost) {
                    // notify about price drop
                    var temp = {
                        "data": product,
                        "type": "notify",
                        "oldPrice": product.cost
                    }
                    console.log('Success: Product already available and Price has dropped from ' + product.cost + ' to ' + cost);
                    return res.status(200).json(temp);
                }
                else {
                    console.log('Product already available and Price is same or increased');
                    return res.status(400).json({
                        msg: "Price not dropped..!"
                    });
                }
                // console.log('Error : A user with this email is already registered with us...!');
                // return res.status(400).json({
                //     msg: "User Already Exists"
                // });
            }

            product = new Product({
                title,
                cost
            });

            await product.save();
            var temp = {
                "data": product,
                "type": "saved"
            }
            console.log('Success: Product saved successfully with the above credentials...!');
            res.status(200).json(temp);
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving the product..!");
        }
    }
);
module.exports = router;