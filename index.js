import express from 'express';
import path from 'path';
import { router as userRoute } from './routes/user.js';
import { router as blogRoute } from './routes/blog.js';
import { connectMongoDb } from './connection.js';
import cookieParser from 'cookie-parser';
import { checkForAuthenticationCookie } from './middlewares/authentication.js';
import { Blog } from './models/blog.js';

const app = express();
const PORT = 8000;

connectMongoDb(
    'mongodb+srv://vedunaik777:jaibhavani@cluster1.8gmaklo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1'
);

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser()); // Initializing cookieParser
app.use(checkForAuthenticationCookie('token')); // Checking token every time
app.use(express.static(path.resolve('./public'))); // Serving static files

// Define routes after middleware
app.use('/user', userRoute);
app.use('/blog', blogRoute);

app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render('home', {
        user: req.user,
        blogs: allBlogs
    });
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
