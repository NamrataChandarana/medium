import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import bcrypt, { hash } from 'bcryptjs'
import { signupInput } from "@namratachandarana/medium-common";
import {signinInput} from '@namratachandarana/medium-common';

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();



userRouter.post('/signup', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
	
    try{
        const res = await c.req.json();
        console.log(res);
        const {success} = signupInput.safeParse(res);

        if(!success) {
          return c.json({
              message: "Incorreact inputs"
          })
        }
  
      const {email, password, name} = res;

      const isUser = await prisma.user.findUnique({
        where: {
        email: email
      }});
      console.log("user:" ,isUser);

      if(isUser){
        return c.json({
            message: 'Incorrect creds'
        });
      }

  
        const hashpwd = await bcrypt.hash(password, 10);
        console.log(hashpwd)
  
        const user = await prisma.user.create({
          data:{
              name,
              email,
              password: hashpwd
          }
          
        });
  
        const userId = user.id;
  
        const token = await sign({
          id: userId
        },c.env.JWT_SECRET)
  
        return c.json({
          jwt: token,
          user
        })

        
      }catch(error){
        c.status(411);
        console.log(error)
        return c.json({
            messsage: "Invalid"
        })
      }

     

})



userRouter.post('/signin',  async(c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());


      try{
        const res = await c.req.json();

        const success = signinInput.safeParse(res);
    
        if(!success){
            return c.json({
              status: "false",
              message: "Enter valid input"
            })
        }
    
        const {email , password} = res;


        const user = await prisma.user.findUnique({
            where: {
            email: email
          }});
          console.log(user);
    
          if(!user){
            return c.json({
                status: false,
                message: 'Incorrect creds'
            });
          }
    
        // const 
    
        const hashpwd = await prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                password: true
            }
        })
    
        if(hashpwd){
            const hashPassword = hashpwd.password;
            const isPwdValid: boolean = await bcrypt.compare(password, hashPassword);
    
            if(!isPwdValid){
                return c.json({
                  status: "false",
                  message: "Invalid email or password"
                })
            }
    
        }
    
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ 
          status: "ture",
          jwt });

      }catch(e){
        c.status(411);
        return c.json({
          status: "false",
          message: "Invalid"
        });
      }


})

