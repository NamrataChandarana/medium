import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import bcrypt from 'bcryptjs'
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
      const {success} = signupInput.safeParse(res);
      const {email, password, name} = res;

      if(!success) {
        return c.json({
            message: "Incorreact inputs"
        })
      }
  
      const isUser = await prisma.user.findUnique({
        where: {
        email: email
      }});

      if(isUser){
        return c.json({
            message: 'Email already used'
        });
      }

      const hashpwd = await bcrypt.hash(password, 10);

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
        const {email , password} = res;
    
        if(!success){
            return c.json({
              status: "false",
              message: "Enter valid input"
            })
        }

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
    
        if(user){
            const hashPassword = user.password;
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
          jwt,
          user });

      }catch(e){
        c.status(411);
        return c.json({
          status: "false",
          message: "Invalid"
        });
      }


})

userRouter.post('/logout', async(c) =>{
  return c.json({ message: 'Logged out successfully' });
} )

userRouter.get('/profile', async(c) =>{

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const userId = c.get('userId');

    try{
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      });

      return c.json({
        success: true,
        user:user,
      });
    }catch(err){
      return c.json({
        status: false,
        message: "Something went wrong"
      })
    }
})