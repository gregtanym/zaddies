const {MongoClient} = require("mongodb")
const Web3 = require("web3")
const web3 = new Web3();
const express = require("express")
const axios = require('axios').default
const cors = require("cors");

const mongo = new MongoClient("mongodb+srv://joechua:Password99@cluster0.ggww2.mongodb.net/mongo1?retryWrites=true&w=majority")
const app = express()
const kPort = 80 //80 also okay

start(); //for mongoDB

//on server
app.listen(kPort)

var corsOptions = {
	origin: ["http://localhost", "http://localhost:80", "http://localhost:3000", "http://127.0.0.1:3000", "http://127.0.0.1:80", "http://127.0.0.1:8080"]
}

app.options('*', cors(corsOptions));
app.use(cors())

console.log(`app is listening on port ${kPort}`)

app.use(express.json()); 
app.use(express.urlencoded({ extended: true}));

// ------------------------------------------------------------------------------------------------
//MIDDLEWARES

// LISTEN OUT FOR JSON REQ TO CREATE WALLETS FOR USER & STORE IN DB
app.post("/createNewAccount", async (req, res, next) => {
	// receives form 
	var vRegistrationForm = req.body

	// //create web3 account/wallet for client
	var account = web3.eth.accounts.create() // create new account
	var privateKey = account.privateKey; //account created, returns an account object
	var JSONKey = web3.eth.accounts.encrypt(privateKey, vRegistrationForm.password) // private key encrypted with password, returns a JSON object

	//transfer money from supply to client's web3 account

	// insert private key & address store new user data in object
	vRegistrationForm.encrypted_JSON_key = JSONKey
	vRegistrationForm.account_address = account.address
	
	// count number of users & use it to insert company_id
	var count = await mongo.db("web3hackathon").collection("users").countDocuments()
	console.log("there is " + count + " users")
	vRegistrationForm.company_id = count
	
	// insert to DB
	await mongo.db("web3hackathon").collection("users").insertOne(vRegistrationForm);

	console.log(count + " user has signed up")
	res.send("congrats on registration. you are the " + count + " user");
});

// LISTEN FOR PAYMENT REQ (WORK IN PROGRESS)
// app.post("/pay", async (req, res, next) => {
// 	//req.body
// 	console.log("paying")
// 	var vTransactionDetails = {
// 		product_id: 123,
// 		consignee: {company_id: 1, company_name: "Amazon"},
// 		consignor: {company_id: 2, company_name: "Apple"},
// 		price: 12,
// 		payment_percentage: 20,
// 		commision_percentage: 10
// 	}

// 	// pull out consignee's JSON & password to get private key
// 	var vConsigneeCursor = await mongo.db("web3hackathon").collection("users").find({company_id: vTransactionDetails.consignee.company_id})
// 	var vConsigneeArray = await vConsigneeCursor.toArray()
// 	var vConsignee = vConsigneeArray[0]
// 	var vConsignee_private_key = web3.eth.accounts.wallet.decrypt(vConsignee.JSONKey, vConsignee.password);

// 	// pull out consignor's address
// 	var vConsignorCursor = await mongo.db("web3hackathon").collection("users").find({company_id: vTransactionDetails.consignor.company_id})
// 	var vConsignorArray = await vConsignorCursor.toArray()
// 	var vConsignor = vConsignorArray[0]

// 	// make consignee pay consignor
// 	console.log(vConsignee_private_key )
// 	console.log(vConsignor.account_address)
// 	// vTransactionDetails.payment_percentage
// 	// vTransactionDetails.commision_percentage

// 	//send transaction details to smart contract via http to oracle node
// 	// var vOracleNodeAddress = {
// 	// 	method: 'post',
// 	// 	url: ``,
// 	// 	headers: {},
// 	// 	body: vTransactionDetails
// 	// };
// 	// var vTransaction = await axios(vOracleNodeAddress)
// 	//if want, when transaction is successfully done on blockchain, can record in our own database
// 	console.log("payment done")
// 	res.send("payment done")
// });



// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
//FUNCTIONS
async function start() {
	//connect to mongoDB
	console.log("connecting Mongo...")
	await mongo.connect()
	console.log("Mongo connected")
}


