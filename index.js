const express = require("express");
const path = require("path");
const csrf = require('csurf')
const flash=require('connect-flash')
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const session = require("express-session");
const MongoStore=require('connect-mongodb-session')(session)
const varMiddleware = require("./middleware/variables");
const userMiddleware=require('./middleware/user')
const keys=require('./keys')

const homeRoutes = require("./routes/home");
const cardRoutes = require("./routes/card");
const addRoutes = require("./routes/add");
const coursesRoutes = require("./routes/courses");
const ordersRoutes = require("./routes/orders");
const authRoutes = require("./routes/auth");



const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs"
});



const store=new MongoStore({
  collection:'sessions',
  uri:keys.MONGODB_URL
})

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
  })
);
app.use(csrf())
app.use(flash())
app.use(varMiddleware);
app.use(userMiddleware)

app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/courses", coursesRoutes);
app.use("/card", cardRoutes);
app.use("/orders", ordersRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    
    await mongoose.connect(keys.MONGODB_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });


    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log("error111", err);
  }
}

start();

