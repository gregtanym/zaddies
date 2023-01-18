const express = require("express"); 
const cors = require("cors");

const kPort = 3000;
const app = express();
var corsOptions = {
	origin: ["http://localhost", "http://localhost:80", "http://localhost:3000", "http://127.0.0.1:3000", "http://127.0.0.1:80"]
}

app.listen(kPort);
app.use(cors())
app.options('*', cors(corsOptions));
app.use(express.json());

console.log(`app is listening on port ${kPort}`)

app.use("/uploads", express.static('uploads'))

// app.post("/createNewAccount", async (req, res, next) => { //receives a form
// 	// receives form of 
// 	// var vRegistrationDetails = {
// 	// 	company_id: 12,
// 	// 	company_name: "Amazon",
// 	// 	deposit_amount: 1000000,
// 	// 	password: "password",
// 	// 	Country: "USA",
// 	// 	Email: "amazon@gmail.com",
// 	// 	Comment: "nil"
// 	// }
// 	console.log("create new account middleware is being called")
// 	var vRegistrationDetails = req.body
// 	console.log(vRegistrationDetails)

// 	// //create web3 account/wallet for client
// 	// var account = web3.eth.accounts.create() // create new account
// 	// var privateKey = account.privateKey; //account created, returns an account object
// 	// var JSONToStore = web3.eth.accounts.encrypt(privateKey, password) // private key encrypted with password, returns a JSON object

// 	// // store new user data in mongoDB
// 	// vRegistrationDetails.encrypted_JSON_key = JSONToStore
// 	// await mongo.db("web3ahackathon").collection("users").insertOne(vRegistrationDetails);
// 	res.end()
// });