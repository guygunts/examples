const DBRepository = require('../repositories/DBRepository');
const e = require('express');

class ProductService {
    constructor() {
        this.DBRepository = new DBRepository();
    }

    async listProduct(req){

        let sql=' where 1=1';

        if (req.id_product){
            sql+=` and id_product=${req.id_product}`
        }
        let client = await this.DBRepository.executeQuery(`select id_login,product_name,product_des from product ${sql}`);

        client.code=200
        return client
    }




}
const productService = new ProductService();
module.exports = productService;