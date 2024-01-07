exports.loginPage = (req, res) => {
  res.render("../Pages/Auth/login", { title: "Login Pages" });
};

exports.loginData = (req, res) => {
  req.session.isLogin = true;
  res.redirect("/");
};

exports.registerData = (req, res) => {};

exports.registerPage = (req, res) => {
  res.render("../Pages/Auth/register", { title: "Register Page" });
};

exports.logoutAccount = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
