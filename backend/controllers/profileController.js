const ErrorHandling = require("../utils/errorHandling");
const catchAsyncError=require("../meddleware/catchAsyncError");

const Profile=require("../models/profileModle")

exports.createProfile=catchAsyncError(async(req,res,next)=>{
    req.body.user = req.user.id;
    req.body.name = req.user.name;
    req.body.email = req.user.email;
    req.body.avatar = req.user.avatar;
    const profile= await Profile.create(req.body)

    res.status(201).json({
        success:true,
        profile
    })

})

exports.getProfile=catchAsyncError(async(req,res,next)=>{
    const profiles= await Profile.find()
    if (!profiles) {
        return next(new ErrorHandling("Profile not found",400));
    }
    res.status(200).json({
        success:true,
        profiles
    })
})

exports.delProfile=catchAsyncError(async(req,res,next)=>{
    const profile= await Profile.findById(req.params.id)

    if (!profile) {
        return next(new ErrorHandling("Profile not found",401));
    }

    profile.remove();

    res.status(200).json({
        success:true
    })
})



exports.singleProfile=catchAsyncError(async(req,res,next)=>{
    const profile= await Profile.findById(req.params.id)

    if (!profile) {
        return next(new ErrorHandling("Profile not found",401));
    }

    

    res.status(200).json({
        success:true,
        profile,
    })
})

// get user profile

exports.userProfile=catchAsyncError(async(req,res,next)=>{
    const profile= await Profile.findOne({user:req.user._id})

    if (!profile) {
        return next(new ErrorHandling("Profile not found",404));
    }

    

    res.status(201).json({
        success:true,
        profile,
    })
})

//add experience

exports.addExperience= catchAsyncError(async (req,res,next)=>{
    const { 
        title,
        company,
        location,
        from,
        to,
        current,
        description,
        productId
     }=req.body;

     const experiences={
        title,
        company,
        location,
        from,
        to,
        current,
        description,
     }

     const profile=await Profile.findById(productId);

     profile.experience.push(experiences);

     await profile.save({ validateBeforeSave:false });

     res.status(201).json({
        success:true,
        profile
     })

})



//Getall reviews ...

exports.getExprience= catchAsyncError(async(req,res,next)=>{
    const profile= await Profile.findById(req.query.id);

    if (!profile) {
        return next(new ErrorHandling("profile not found ",404));
        
    }

    res.status(200).json({
        success:true,
        experience: profile.experience,
    })
})

// Delete Review
exports.deleteExprience = catchAsyncError(async (req, res, next) => {
    const profile= await Profile.findOne({user:req.user._id})

    if (!profile) {
        return next(new ErrorHandling("Profile not found",404));
    }

    profile.experience=profile.experience.filter((rev)=>(
        rev._id.toString() !== req.params.id.toString()
        
    ));
    profile.save();
    res.status(201).json({
        success:true,
        profile,
    })
  });





  //add education

exports.addeducation= catchAsyncError(async (req,res,next)=>{
    const { 
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
        productId
     }=req.body;

     const educations={
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
     }

     const profile=await Profile.findById(productId);

     profile.education.push(educations);

     await profile.save({ validateBeforeSave:false });

     res.status(201).json({
        success:true,
        profile
     })

})



//Getall...

exports.geteducation= catchAsyncError(async(req,res,next)=>{
    const profile= await Profile.findById(req.query.id);

    if (!profile) {
        return next(new ErrorHandling("profile not found ",404));
        
    }

    res.status(200).json({
        success:true,
        education: profile.education,
    })
})

// Delete Review
exports.deleteeducation = catchAsyncError(async (req, res, next) => {
    const profile= await Profile.findOne({user:req.user._id})

    if (!profile) {
        return next(new ErrorHandling("Profile not found",404));
    }

    profile.education=profile.education.filter((rev)=>(
        rev._id.toString() !== req.params.id.toString()
        
    ));
    profile.save();
    res.status(201).json({
        success:true,
        profile,
    })
  });