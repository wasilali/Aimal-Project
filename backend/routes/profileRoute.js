const express = require("express");
const { createProfile, getProfile, delProfile, singleProfile, userProfile, addExperience, getExprience, deleteExprience, addeducation, geteducation, deleteeducation } = require("../controllers/profileController");
const { isAuthenticatedUser } = require("../meddleware/auth");

const router=express.Router()

router.route("/profile/new").post(isAuthenticatedUser,createProfile)

router.route("/profile/get").get(isAuthenticatedUser,getProfile)

router.route("/my/profile").get(isAuthenticatedUser,userProfile)

router.route("/profile/single/:id").get(isAuthenticatedUser,singleProfile)

router.route("/profile/delete/:id").delete(isAuthenticatedUser,delProfile)

router.route("/experience").put(isAuthenticatedUser,addExperience)

router.route("/get/experience").get(isAuthenticatedUser,getExprience)

router.route("/delete/experience/:id").delete(isAuthenticatedUser,deleteExprience)

router.route("/education").put(isAuthenticatedUser,addeducation)

router.route("/get/education").get(isAuthenticatedUser,geteducation)

router.route("/delete/education/:id").delete(isAuthenticatedUser,deleteeducation)

module.exports=router