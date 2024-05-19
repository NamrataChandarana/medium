import { Hono } from 'hono'
import { userRouter } from './routes/user';
import {postRouter} from './routes/post';
import { authMiddleware } from './middleware/auth';
import { cors } from 'hono/cors'

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
	}
}>();
app.use('/api/*', cors())
app.use(
  '/api2/*',
  cors({
    origin: 'http://localhost:5173',
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  })
)

app.use("/api/v1/post/blog/*", authMiddleware );
app.route('/api/v1/users', userRouter);
app.route('/api/v1/post', postRouter);



export default app
