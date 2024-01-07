const Post = require("../Models/Mpost");

exports.getPosts = (req, res) => {
  Post.find()
    .populate("userId", "email")
    .then((post) => {
      console.log(post);
      res.render("home", {
        title: "Home Pages",
        postArr: post,
        isLogin: req.session.isLogin ? true : false, // we feine cause session undefined
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createPost = (req, res) => {
  const { title, description, image } = req.body;
  Post.create({ title, description, image, userId: req.user })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.renderPostForm = (req, res) => {
  res.render("postForm", { title: "Post Form" });
};

exports.postDetail = (req, res) => {
  const id = req.params.id;
  Post.findById({ _id: id })
    .then((result) => {
      res.render("postDetail", { title: "Post Detail", post: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deletePost = (req, res) => {
  const id = req.params.id;
  Post.deleteOne({ _id: id })
    .then((_) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOldPost = (req, res) => {
  const id = req.params.id;
  Post.findById(id)
    .then((result) => {
      res.render("editPost", { title: "Edit Post", post: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updatedPost = (req, res) => {
  const { title, description, image, id } = req.body;
  Post.findById({ _id: id })
    .then((post) => {
      if (post) {
        post.title = title;
        post.description = description;
        post.image = image;
        return post.save();
      }
    })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
