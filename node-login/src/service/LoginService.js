const DBRepository = require('../../src/repositories/DBRepository');
const axios = require('axios');
const pathdev = require('dotenv').config({ path: './config/dev.env' });
class LoginService {
    constructor() {
        this.DBRepository = new DBRepository();
    }

    async listuser(req){

        let client = await this.DBRepository.executeQuery("select id_login,user_name,password from login where id_login=?",[ req.id_login]);
        let datahistory = await axios.get(`${pathdev.parsed.postlisthistory}${req.id_login}`)
        let datajson={
            code:200,
            data:client,
            history_data:datahistory.data
        }
        return datajson
    }

    async loginUsers(req) {
        try{
            let resultJson
        let client = await this.DBRepository.executeQuery("select user_name from login where user_name='" + req.username + "'");
        if (client.length != 0) {
            let clientpass = await this.DBRepository.executeQuery("select id_login,user_name, PASSWORD from login where user_name='" + req.username + "' and PASSWORD ='" + req.password + "'");
            if (clientpass.length != 0) {
                resultJson = {
                    "code": '200',
                    "msg": 'success',
                    "user": clientpass[0].id_login,
                }
            } else {
                resultJson = {
                    "code": '400',
                    "msg": 'password is Wrong'
                }
            }
            return resultJson
        } else {
            resultJson = {
                "code": '400',
                "msg": 'Username is Wrong'
            }
            return resultJson
        }
        }catch(err){
            console.log(error)
            return error
        }
        
    }

    async registerUser(req) {
        try {
            const check = await  this.DBRepository.executeQuery('select user_name from login where user_name = ?',[req.username])
            if(check.length>0){
             let   responsedata = {  
                    "code": 400,
                    "mess":"duplicate user"
                }
                return responsedata
            } else{
                await this.DBRepository.executeQuery(`INSERT INTO login
            (user_name,
            password,
             CREATE_BY,
             CRATE_DATE)
            VALUES
            (?,?,?,CURRENT_TIMESTAMP)`,[req.username,req.password,req.username])

            let resultJson = {
                "code": '200',
                "msg": 'success'
              }
              return resultJson
             }   
            
        } catch (error) {
            console.log(error)
            let err={
                "code": 502,
                "msg": error.message
            }
            return err
        }

    }

}
const loginService = new LoginService();
module.exports = loginService;