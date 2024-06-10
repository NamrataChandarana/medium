import { RpcStub } from 'cloudflare:workers'
import { createMiddleware } from 'hono/factory'
import  { verify } from 'hono/jwt'

export const authMiddleware = createMiddleware<{Bindings: {
    JWT_SECRET: string
},
    Variables: {
        userId: string
    }
}>(async(c, next) => {
        try{
            const header = c.req.header("Authorization") || "";

            if (!header) {
                c.status(401);
                return c.json({ error: "unauthorized" });
            }
        
            const token = header?.split(' ')[1];
        
            const response = await verify(token, c.env.JWT_SECRET)
    
            
    
            if (response) {
                c.set("userId", response.id);
                await next()
              } else {
                c.status(403)
                return c.json({ error: "unauthorized" })
            }
        }catch(e){
            c.status(403)
            return c.json({
                error: "You are not loged in"
            })
        }
       
})


