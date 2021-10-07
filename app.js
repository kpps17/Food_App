const express = require("express");
const app = express();
const {authRouter} = require('./Routers/authRouter');
const {userRouter} = require('./Routers/userRouter');
const cookieParser = require('cookie-parser');

let port = '8080';

app.listen(port, () => {
	console.log(`server is on port ${port}`);
});

app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

app.use('/auth', authRouter);
app.use('/user', userRouter);


app.use((req, res) => {
	res.sendFile('./public/404.html', {root: __dirname});
})