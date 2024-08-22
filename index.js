const express= require('express');
const cors= require('cors');
const dotenv=require('dotenv')
const app= express();
const port = 5000;

app.use(express.json())
app.use(cors())

app.get('/', async(req,res)=>{
    res.send('Server is running...')
})
app.get('/users', async(req,res)=>{
    res.send({})
})

app.listen(port,()=>console.log(`Server is running on port: ${port}`))