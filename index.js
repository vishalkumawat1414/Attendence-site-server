const dotenv = require("dotenv");
const express = require("express");
const GetRouter = require('./routes/GetRouter')
const PostRouter = require('./routes/PostRouter')
const DeleteRouter = require('./routes/DeleteRouter')
var cors = require("cors");
dotenv.config('./.env')
const app = express();


app.use(express.json());

app.use(
	cors({
		credentials: true,
		origin: "https://lucent-toffee-d452ca.netlify.app",
	})
);


module.exports = app;
app.use('/api',GetRouter)
app.use('/api',PostRouter)
app.use('/api', DeleteRouter);

app.listen(process.env.PORT, () => {
	console.log(`Listening on ${ process.env.PORT}`);
});


