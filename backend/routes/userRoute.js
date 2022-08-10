const express = require("express");
const { userRegister, loginUser, logout, forgotPass, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUsers, updateUserRoles, deleteUser, followUser, emailVerify, getMyPosts, getUserPosts, getUserProfile, deleteMyProfile } = require("../controllers/userController");
const { isAuthenticatedUser } = require("../meddleware/auth");

const router=express.Router()

router.route("/register").post(userRegister);

router.route("/login").post(loginUser);

router.route("/me").get(isAuthenticatedUser,getUserDetails);

router.route("/delete/me").delete(isAuthenticatedUser, deleteMyProfile);

router.route("/logout").get(logout);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile)

router.route("/user/id").delete(isAuthenticatedUser,deleteUser)

router.route("/user/:id").get(isAuthenticatedUser, getUserProfile);

router.route("/follow/:id").get(isAuthenticatedUser,followUser)

router.route("/password/forgot").post(forgotPass);

router.route("/password/reset/:token").put(resetPassword);

router.route("/users").get(isAuthenticatedUser, getAllUsers);

router.route("/my/posts").get(isAuthenticatedUser, getMyPosts);

router.route("/userposts/:id").get(isAuthenticatedUser, getUserPosts);

module.exports=router;