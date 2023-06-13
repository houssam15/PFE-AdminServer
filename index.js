import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import stripe from 'stripe';
import dotenv from 'dotenv';
import axios from "axios"
dotenv.config();
const stripeInstance = stripe(process.env.SECRET_KEY);
const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const PORT = 4002 || procces.env.PORT;
// app.use("/",Routes);

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
app.post('/payement',async (req,res)=>{
    let status,error;
    const {token,amount,user} = req.body;
    try{
        await stripeInstance.charges.create({
            source:token.id,
            amount,
            currency:"usd",
        })
        
        status="success"

    }catch(error){
        console.log(error)
        status="Failure"
    }
    res.json({error,status})    
})
app.post('/activeAccount',async (req,res)=>{
    let status,error;
    const {token,amount,user} = req.body;
    try{
        await stripeInstance.charges.create({
            source:token.id,
            amount,
            currency:"usd",
        })
        status="success"
       
    }catch(error){
        console.log(error)
        status="Failure"
    }
    res.json({error,status})    
})



app.post('/test',async (req,res)=>{return res.status(200).json({msg:"hello i am working"})})
export {};

