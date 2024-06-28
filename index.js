require('dotenv').config()

require('./db/connections')
//create server using express
const express=require('express')


const ServerApp=express()
// cors connect-with front end

const cors=require('cors')
const router = require('./Routes/routes')
ServerApp.use(cors())


//convert all incoming json data to js
ServerApp.use(express.json())
ServerApp.use(router)

//exports upload folder to client app express.static()
ServerApp.use('/uploads',express.static('./uploads'))

// port set listen
const PORT=8005 || process.env.PORT

ServerApp.listen(PORT,()=>{
    console.log(`________________project server starts at ${PORT}`);
})



//resolve api request

// ServerApp.get('/',(req,res)=>{
//     res.send("<h1> Hellooo</h1>")
// })

// ServerApp.post('/postexc',(req,res)=>{
//     res.json(`_______Post Requests_______${req.body.username}`)
// })

// ServerApp.get('/getexc',(req,res)=>{
//     res.send("get requested 2 recieved")
// })