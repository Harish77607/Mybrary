if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout"); // every single file is going to be put inside this layout file so we dont have to duplicate all the beginning html and ending html.
app.use(expressLayouts);
app.use(express.static("public")); //to tell express where are our public files are going to be like stylesheets, js files, img's

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to mongoose"));

app.use("/", indexRouter); //this crashes because it doesnt know exactly where it is coming from!

app.listen(process.env.PORT || 3000);
