const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const config = require('./config/db')

//connect to db
mongoose.connect(config.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', ()=>{
    console.log('Connected to MONGO');
})

const app = express();

// view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//set public
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req,res)=>{
    res.send("Working");
})

//start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
