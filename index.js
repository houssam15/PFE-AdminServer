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
        
        const response = await axios.post("http://localhost:4001/renialiser",{reponse:user})
        if(response.data.success==true){
            status="success"
        }else{
            status="Failure"
        }
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
        
        const response = await axios.post("http://localhost:4001/activer",{reponse:user})
        if(response.data.success==true){
            status="success"
        }else{
            status="Failure"
        }
    }catch(error){
        console.log(error)
        status="Failure"
    }
    res.json({error,status})    
})
export {};

