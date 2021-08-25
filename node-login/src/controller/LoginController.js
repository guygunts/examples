const loginService =require('../service/LoginService');
class LoginController {

  async listUser(req, res) {
    const ret = await loginService.listuser(req.query);
      res.status(ret.code).json(ret);

  }

  async loginUser(req, res) {
    const ret = await loginService.loginUsers(req.body);
      res.status(ret.code).json(ret);

  }

  async registerUser(req, res) {
    const ret = await loginService.registerUser(req.body);
    res.status(ret.code).json(ret);
  }

 
}
const loginController = new LoginController();
module.exports= loginController;