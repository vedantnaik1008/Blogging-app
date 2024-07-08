import { Router } from "express"
import { User } from "../models/user.js";

export const router  = Router()

router.get("/signin", (req, res)=> {
    return res.render("signin")
})

router.get('/signup', (req, res) => {
    return res.render('signup');
});

router.post('/signup', async(req, res) => {
    const { fullName, email, password } = req.body;

    await User.create({
        fullName, 
        email, 
        password
    })

    return res.redirect("/")
});