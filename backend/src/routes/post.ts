import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createPostInput, updatePostInput} from '@namratachandarana/medium-common'

export const postRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_TOKEN: string
    },
    Variables: {
        userId: string
    }
}>();


postRouter.post('/blog', async(c) => {
    console.log("hello")
    const userId = c.get('userId');
    console.log(userId)
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      try{

        const body = await c.req.json();

        const {success} = createPostInput.safeParse(body);

        if(!success) {
          return c.json({
              message: "Incorreact inputs"
          })
        }

        const post = await prisma.post.create({
            data:{
                title: body.title,
                content: body.content,
                authorId: userId
            }
        })

        if(post){
            return c.json({
                message: "Post created!"
            })
        }

      }catch(e){
        return c.json({
            message: "Something went wrong"
        })
      }
    
    
})

postRouter.put('/blog',async(c) => {
	const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      try{
        const body = await c.req.json();
        const {success} = updatePostInput.safeParse(body);

        if(!success) {
          return c.json({
              message: "Incorreact inputs"
          })
        }

        const post = await prisma.post.update({
            where: {
                id: body.id,
                authorId: userId
            },
            data: {
                title: body.title,
                content: body.content
            },

        })
        console.log(post)

        return c.json({
            message: "Post updated!",
        })

      }catch(e){
        c.status(411)
        return c.json({
            message:"Something went wrong!"
        })
      }
    
})


postRouter.get('/bulk', async(c) => {
	const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const posts = await prisma.post.findMany({
            select:{
                id:true,
                title: true,
                content: true,
            }
        })

        return c.json({
            message: "Posts fetched!",
            posts
        })
    }catch(e){
        return c.json({
            message: "Something went wrong"
        })
    }
    
})

postRouter.get('/:id', async(c) => {
	const id = c.req.param('id')
	console.log(id);
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

	
    try{
        const post = await prisma.post.findUnique({
            where: {
                id: id
            },
            select:{
                title: true,
                content: true,
            }
        })

        return c.json({
            message: "Post fetched!",
            post
        })

    }catch(e){
        return c.json({
            message: "Something went wrong"
        })
    }
})