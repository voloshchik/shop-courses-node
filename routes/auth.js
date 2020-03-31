const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.get("/login", async (req, res) => {
  res.render("auth/login", {
    title: "Авторизация",
    isLogin: true
  });
});

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login#login");
  });
});

router.post("/login", async (req, res) => {
  const user = await User.findById("5e7cc9b33a2c893de2afd62f");
  req.session.user = user;
  req.session.isAuthenticated = true;
  req.session.save(err => {
    if (err) {
      throw err;
    } else {
      res.redirect("/");
    }
  });
});

router.post("/register", async (req, res) => {
  try {
    const { email, password,name, repeat } = req.body;

    const candidate=await User.findOne({email})

    if(candidate){
      return res.redirect('/auth/login#register')
    }else{
      const user=new User({
        email,name,password,cart:{items:[]}
      })
      user.save()
      res.redirect('/auth/login#login')
    }

  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
