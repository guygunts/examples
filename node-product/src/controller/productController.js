const productService =require('../service/productService');
class LoginController {
  async listproduct(req, res) {
    const ret = await productService.listProduct(req.query);
      res.status(ret.code).json(ret);

  }
 
}
const loginController = new LoginController();
module.exports= loginController;