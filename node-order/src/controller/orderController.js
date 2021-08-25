const orderService =require('../service/orderService');
class OrderController {
  async listnorder(req, res) {
    const ret = await orderService.listOrder(req.query);
      res.status(ret.code).json(ret);

  }

  async addorder(req, res) {
    const ret = await orderService.addOrder(req.body);
      res.status(ret.code).json(ret);

  }
 
  async updateorder(req, res) {
    const ret = await orderService.updateOrder(req.body);
      res.status(ret.code).json(ret);

  }

}
const orderController = new OrderController();
module.exports= orderController;