const DBRepository = require('../repositories/DBRepository');
const e = require('express');

class OrderService {
    constructor() {
        this.DBRepository = new DBRepository();
    }

    async listOrder(req){

        let sql=' where 1=1';

        if (req.id_order){
            sql+=` and id_order=${req.id_order}`
        }

        if (req.id_login){
            sql+=` and id_login=${req.id_login}`
        }

        let client = await this.DBRepository.executeQuery(`select id_order,order_name,order_price,order_status from order_item ${sql}`);

        client.code=200
        return client
    }

    async addOrder(req){
        try{
            let client = await this.DBRepository.executeQuery(`insert INTO order_item (id_login,order_name,order_price,order_status,CREATE_BY,CRATE_DATE) VALUES(?,?,?,?,?,CURRENT_TIMESTAMP)`,[req.id_login,req.order_name,req.order_price,req.order_status,req.username]);
        client.code=200
        return client
        }catch(err){
            console.log(err)
            return err
        }
        
        
    }

    async updateOrder(req){
        try{
        let client = await this.DBRepository.executeQuery(`UPDATE order_item SET order_status=?,UPDATE_BY=?,UPDATE_DATE=CURRENT_TIMESTAMP WHERE id_order=? `,[req.order_status,req.username,req.id_order]);
        client.code=200
        return client
        }catch(err){
            console.log(err)
            return err
        }
        
    }
}
const orderService = new OrderService();
module.exports = orderService;