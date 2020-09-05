const express = require("express");
const path = require("path");

const app = express();

// view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//set public
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req,res)=>{
    res.send('Working')
})

//start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
