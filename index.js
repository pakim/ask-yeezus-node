import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_url = "https://api.kanye.rest";
let kanyeQuote = "";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { quote: kanyeQuote });
});

app.post("/submit", async (req, res) => {
  try {
    if(req.body.question) {
      const result = await axios.get(API_url);
      kanyeQuote = result.data.quote;
    }
    else {
      kanyeQuote = "";
    }
    res.redirect("/");
  }
  catch(error) {
    console.log(error);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});