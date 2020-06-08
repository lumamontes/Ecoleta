// node -v
// npm -v
// npm init -y
// npm install express
// npm install nodemom
//"start": "nodemon src/server.js"
const express = require("express")
const server = express()

//configurar pasta publica
server.use(express.static("public"))

//utilizando template engine
//instalar nunjucks, funcoes e etc dentro do HTML. npm install nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache = true
})
//configurar caminhos da minha aplicacao
//página inicial
// Req: requisição
// res: Resposta
server.get("/",function(req,res){
    //enviar arquivo
    return res.render("index.html", { title: ""})
})
server.get("/create-point", function(req,res){
    //enviar arquivo
    return res.render("create-point.html")
})
//ligar o servidor
server.listen(3000)

