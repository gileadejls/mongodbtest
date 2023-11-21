const mongoose = require('mongoose')

const loginSchema = mongoose.Schema({
    nome: String,
    password: String,
})

const userModel = mongoose.model('usuarios', loginSchema)


class Login{
    constructor(body){
        this.body = body
        this.errors = []
        this.user = null
    }

    async logar(){
        this.validate()

        if(this.errors.length == 0){
            return
        }

        try{
            let result = await userModel.find({nome: this.body.name, password: this.body.password})
            if(result.length == 0){
                this.errors.push('Não foi possivel fazer login, tente novamente!')
                return 
            }

            this.user = result[0]
            return true
        }catch(e){console.log(e)}
    }


    validate(){
        if(this.body.name.length < 4 || this.body.name.length || this.body.name == undefined || this.body.name.length == null){
            this.errors.push('Login ou senha invalidos, por favor tente novamente.')
            return
        }
    }
}


module.exports = Login