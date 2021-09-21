const express = require('express');
const app = express();
const authRouter = express.Router();

let port = 8080;

app.listen(port, () => {
    console.log(`server started on ${port}`);
})

app.get('/', (req, res) => {
    res.sendFile('./public/index.html', { root: __dirname });
})

let user = [];
app.use(express.json());
app.use('/auth', authRouter);

authRouter.route('/signup').post((req, res) => {
    let userDetails = req.body;
    user.push(userDetails)
    res.json({
        message: "user added",
        user: userDetails,
    });
    console.log(user);
})