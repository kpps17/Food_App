const express = require("express");
const app = express();
const userRouter = express.Router();
const authRouter = express.Router();
const userModel = require('./models/userModel')

let port = '8080';

app.listen(port, () => {
	console.log(`server is on port ${port}`);
});

app.use(express.json());
app.use(express.static("public"));


app.get('/', (req, res) => {
	res.sendFile('./public/index.html', { root: __dirname });
})

app.use('/auth', authRouter);

authRouter.route('/signup').post(setCreatedAt, async (req, res) => {
	try {
		let userDetails = req.body;
		// user.push(userDetails);
		let user = await userModel.create(userDetails);
	
		res.json( {
			message: "user signed up",
			user: userDetails,
		})
		// console.log(user)
	} catch (err) {
		console.log(err);
	}
})

function setCreatedAt(req, res, next) {
	let obj = req.body;
	let len = Object.keys(obj).length;
	if(len == 0) return res.status(400).json({message: "cannot create if body is empty"});
	req.body.createdAt = new Date().toISOString();
	next();
}

app.use((req, res) => {
	res.sendFile('./public/404.html', {root: __dirname});
})