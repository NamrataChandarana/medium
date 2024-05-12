import { Hono } from 'hono'
import { userRouter } from './routes/user';
import {postRouter} from './routes/post';
import { authMiddleware } from './middleware/auth';

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
	}
}>();

app.use("/api/v1/post/blog/*", authMiddleware );
app.route('/api/v1/users', userRouter);
app.route('/api/v1/post', postRouter);



export default app
