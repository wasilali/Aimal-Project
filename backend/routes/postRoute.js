const express=require("express");
const { likeAndUnlikePost, delPost, getPostOfFollowing, updateCaption, commentOnPost, deleteComment, createPost } = require("../controllers/postController");
const { isAuthenticatedUser } = require("../meddleware/auth");
const routes=express.Router();

routes.route("/post/upload").post(isAuthenticatedUser,createPost);

routes.route("/post/:id").get(isAuthenticatedUser,likeAndUnlikePost);

routes.route("/post/:id").delete(isAuthenticatedUser,delPost);

routes.route("/posts").get(isAuthenticatedUser,getPostOfFollowing);

routes.route("/post/:id").put(isAuthenticatedUser,updateCaption);

routes.route("/post/comment/:id").put(isAuthenticatedUser,commentOnPost)
.delete(isAuthenticatedUser,deleteComment);



module.exports=routes