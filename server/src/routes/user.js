import { Router } from "express";
import { userSchema } from "../helper/userSchema.js";
import insertUser from "../helper/insertUser.js";
import { verifyUser } from "../helper/verifyUser.js";
import { generateToken } from "../helper/jwt.js";
import { authenticate } from "../middlewares/authenticate.js";
import { prisma } from "../helper/pooler.js";
const router = Router();


router.post("/signup" , async(req,res)=>{
    const {fname , lname ,email,password} = req.body;
    const inputValidation = userSchema.safeParse({
        firstName:fname,
        lastName:lname,
        email:email,
        password:password
    })
    if(!inputValidation.success)
    {
        return res.status(400).json({success:false,msg:"Please enter valid email or password(min:8)"});
    }
    try{
        const userExists = await verifyUser(email,password);
        if(userExists){
            const token = generateToken({userId:userExists.id,email:userExists.email});
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", 
                sameSite:"Lax",
                maxAge:60 * 60 * 1000,
            });
            return res.json({success:false,"msg":"User already exists"})
        }
        const createUser = await insertUser(fname,lname,email,password)
        return res.status(200).json({success:true,"user":createUser})
        
    }
    catch{
        return res.status(500).json({success:false,"msg":"Error during signup"});
    }
})

router.post("/signin", async(req, res) => {
    const {email, password} = req.body;
    const inputValidation = userSchema.safeParse({email, password});
    
    if(!inputValidation.success) {
        return res.status(400).json({
            success: false,
            message: "Please enter valid email or password (min:8)"
        });
    }

    try {
        const user = await verifyUser(email, password);
        if(!user) {
            return res.status(401).json({  
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = generateToken({userId: user.id, email: user.email});
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 1000,
            sameSite:"Lax"
        });

        return res.status(200).json({
            success: true,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });
    } catch(e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});
router.get("/me" , authenticate , async(req,res)=>{
    try{
        const userId = req.user.userId;
        console.log(req.user)
        const user = await prisma.user.findFirst({
            where:{
                id:userId,
            },
            select:{
                id:true,
                email:true,
                firstName:true,
                lastName:true,
                isAdmin:true
            }
        })
        res.json({"success" : true,"user":user});
    }
    catch(e)
    {
        console.log(e)
        res.send("Error in authenticating");
    }
})

router.get("/logout",authenticate,async(req,res)=>{
 res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
  });
  return res.json({ success: true, message: 'Logged out successfully' });})

export default router