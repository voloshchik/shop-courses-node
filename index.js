const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const homeRoutes = require("./routes/home");
const cardRoutes = require("./routes/card");
const addRoutes = require("./routes/add");
const coursesRoutes = require("./routes/courses");
const ordersRoutes=require('./routes/orders')
const authRoutes=require('./routes/auth')


const User = require("./models/user");

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(async (req, res, next) => {
  try {
    const user = await User.findById("5e7cc9b33a2c893de2afd62f");
    req.user = user;
    next()
  } catch (error) {
    console.log(error);
  }
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/courses", coursesRoutes);
app.use("/card", cardRoutes);
app.use('/orders',ordersRoutes)
app.use('/auth',authRoutes)


const PORT = process.env.PORT || 3000;

async function start() {
  try {
    const url =
      "mongodb+srv://vladimir:SRs1OrGV1zuNCLm6@cluster0-ikqau.mongodb.net/shop";
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    const candidate = await User.findOne();
    if (!candidate) {
      const user = new User({
        email: "lovkiy2012@gmail.com",
        name: "Vladimir",
        cart: { items: [] }
      });
      await user.save();
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log("error111", err);
  }
}

start();

// const password = "knZIBD9pup3LacPG";
// const password1 = "SRs1OrGV1zuNCLm6";
// const url =
//   "mongodb+srv://vladimir:knZIBD9pup3LacPG@cluster0-ikqau.mongodb.net/shop";
