const express=require('express');
const router=express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const { request } = require('express');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

secret_data="abhishekis$boy"

// create  a user
router.post('/createuser', [
    body('email').isEmail(),
    body('name').isLength({min:3}),
    body('password').isLength({min:5}),

], async (req,res)=>{
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        
        
        let user = await User.findOne({email:req.body.email});
        if (user){
            return res.status(400).json({error:"sorry email already exist"})
        }

        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(req.body.password,salt);

        user= await User.create({
            name: req.body.name,
            password : secpass,
            email: req.body.email,
        })

        const data={
            user:{
                id:user.id
            }
        }

        const jwtData= jwt.sign(data,secret_data);
        
        res.json({jwtData})
    } catch (error) {
        res.status(500).send("internal server error ")
    }
    })
    
// login user
router.post('/login', [
    body('email','enter a valid email').isEmail(),
    
    body('password','password cannot be blank').exists(),

], async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password}=req.body;
    try {
        let user= await User.findOne({email})
        if(!user){
            
        return res.status(400).json({ errors:"please type a correct username or password" });
        }

        const pasComp= await bcrypt.compare(password,user.password);
        if (!pasComp){
        return res.status(400).json({ errors:"please type a correct username or password" });
        }
        
        const data={
            user:{
                id:user.id
            }
        }

        const jwtData= jwt.sign(data,secret_data);
        
        res.json({jwtData})


    } catch (error) {
        
            res.status(500).send("internal server error")
        
        
    }




});

//get userdetails
router.post('/userdetails',fetchuser, async (req,res)=>{
try {
    userId=req.user.id
    const user= await User.findById(userId).select("-password")
    res.send(user)

    
} catch (error) {
    console.error(error.message)
    res.status(500).send("internal server error")
    
}
})
module.exports=router