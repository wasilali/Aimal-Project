const ErrorHandling = require("../utils/errorHandling");
const catchAsyncError=require("../meddleware/catchAsyncError");
const User=require("../models/userModle");
const Post=require("../models/postModle");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto");
const someToken = require("../utils/jwtToken");

const cloudinary=require("cloudinary");

//REGISTER USER,...
exports.userRegister=catchAsyncError(async(req,res,next)=>{
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatar",
        width: 150,
        crop: "scale",
      });
    const {name,email,password,profile}=req.body;
    const user= await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
        profile:null
    });
    someToken(user,201,res);

})

//Login User,...
exports.loginUser = catchAsyncError(async (req,res,next)=>{
const { email,password }=req.body;

if (!email || !password) {
    return next(new ErrorHandling("Please enter Email & Password",400));
}

const user=await User.findOne({ email }).select("+password");

if (!user) {
    return next(new ErrorHandling("Invalid email or password",401));
}

const isPasswordMatched=await user.comparePassword(password);

if (!isPasswordMatched) {
    return next(new ErrorHandling("Password not matched",401));
}
someToken(user,200,res);
})

//LOGOUT USER...

exports.logout= catchAsyncError( async(req,res,next)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true,
    });
    
        res.status(200).json({
            success:true,
            message:"logout hogya"
        });
    });




//Get User Details,...
exports.getUserDetails = catchAsyncError(async(req,res,next)=>{
    //user.id save in auth//isAuthenticatedUser when we login thee user.

    let user= await User.findById(req.user.id).populate("posts");

    res.status(200).json({
        success:true,
        user,
    });
})



//update user password

exports.updatePassword = catchAsyncError(async(req,res,next)=>{
    let user= await User.findById(req.user.id).select("+password");
    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);

if (!isPasswordMatched) {
    return next(new ErrorHandling("old Password is inncorect",400));
}

if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandling("Password is not matched",400));
}

    user.password= req.body.newPassword;
    //.save() use for save all the changings in user...
    //.save() use for save all the changings in user...
    await user.save();

    someToken(user,200,res)
});

//del USER ()

exports.deleteUser = catchAsyncError(async(req,res,next)=>{

    const user = await User.findById(req.user.id);
    const posts = user.posts;
    const followers = user.followers;
    const following = user.following;
    const userId = user._id;

    // Removing Avatar from cloudinary
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    await user.remove();

    // Logout user after deleting profile

    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    // Delete all posts of the user
    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(posts[i]);
      await cloudinary.v2.uploader.destroy(post.image.public_id);
      await post.remove();
    }

    // Removing User from Followers Following
    for (let i = 0; i < followers.length; i++) {
      const follower = await User.findById(followers[i]);

      const index = follower.following.indexOf(userId);
      follower.following.splice(index, 1);
      await follower.save();
    }

    // Removing User from Following's Followers
    for (let i = 0; i < following.length; i++) {
      const follows = await User.findById(following[i]);

      const index = follows.followers.indexOf(userId);
      follows.followers.splice(index, 1);
      await follows.save();
    }

    // removing all comments of the user from all posts
    const allPosts = await Post.find();

    for (let i = 0; i < allPosts.length; i++) {
      const post = await Post.findById(allPosts[i]._id);

      for (let j = 0; j < post.comments.length; j++) {
        if (post.comments[j].user === userId) {
          post.comments.splice(j, 1);
        }
      }
      await post.save();
    }
    // removing all likes of the user from all posts

    for (let i = 0; i < allPosts.length; i++) {
      const post = await Post.findById(allPosts[i]._id);

      for (let j = 0; j < post.likes.length; j++) {
        if (post.likes[j] === userId) {
          post.likes.splice(j, 1);
        }
      }
      await post.save();
    }

    res.status(200).json({
      success: true,
      message: "Profile Deleted",
    });
    });
    

//bsyhatkheha
//UPDATE USER

exports.updateProfile = catchAsyncError(async(req,res,next)=>{
    const findavt = await User.findById(req.user.id);
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        
      };
      if (req.body.avatar!== "") {
        const user = await User.findById(req.user.id);
    
        const imageId = user.avatar.public_id;
    
        await cloudinary.v2.uploader.destroy(imageId);
    
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatar",
          width: 150,
          crop: "scale",
        });
    
        newUserData.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };

      
      }
     
      const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      res.status(200).json({
        success: true,
      });
});

//follow unfollow,....
exports.followUser=catchAsyncError(async(req,res,next)=>{
    const userToFollow=await User.findById(req.params.id)
    const loginUser=await User.findById(req.user.id)

    if (!userToFollow) {
        return res.status(404).json({
            success: false,
            message: "userToFollow not found",
          });
    }

    if (loginUser.following.includes(userToFollow._id)) {
        indexOfLoginUser=loginUser.following.indexOf(userToFollow._id)
        indexOfUserToFollow=userToFollow.followers.indexOf(loginUser._id)

        loginUser.following.splice(indexOfLoginUser,1)
        userToFollow.followers.splice(indexOfUserToFollow,1)

        await loginUser.save()
        await userToFollow.save()

        return res.status(200).json({
            success:true,
            message:"unFollow ho gya shokria"
        })

    }

    loginUser.following.push(userToFollow._id)
    userToFollow.followers.push(loginUser._id)
    await loginUser.save()
    await userToFollow.save()
    res.status(200).json({
        success: true,
        message: "follow ho gya",
      });


})



//Forget pass,...


exports.forgotPass=catchAsyncError( async(req,res,next)=>{
  const user = await User.findOne({ email:req.body.email });

  if (!user) {
      return next(new ErrorHandling("User not Found",404));
  }
  //Get ResetToken,...
  const resetToken= user.getResentPassToken();

  await user.save({ validateBeforeSave:false });
  //for front end and backend for live for postmen also,...
  
  // const resetPassUrl=`${req.protocol}://${req.get("host")}/api/v2/password/reset/${resetToken}`
  //for only for frontend
  const resetPassUrl= `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  // \n means next line,...

  const message= `Your password reset token is tempt :-\n\n ${resetPassUrl}\n\nIf you not requested this email
  then, please ignore it.`;


  try {
      await sendEmail({
          email:user.email,
          subject:`Ecommerce Password Recovery`,
          message,
      });
      res.status(200).json({
          success:true,
          message:`email send on ${user.email} successfully...`,
      });
      
  } catch (error) {
      resetPasswordToken= undefined;
      resetPasswordExpire= undefined;
  await user.save({ validateBeforeSave:false });

  return next(new ErrorHandling(error.message, 500))
  }
});

//Reset Password,...
exports.resetPassword= catchAsyncError(async(req,res,next)=>{
  // Creating token hash
  const resetPasswordToken=crypto.createHash("sha256")
  .update(req.params.token)
  .digest("hex")

  const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
  })

  if (!user) {
      return next(new ErrorHandling("Reset Password Token or has been expired",400));
  }

  if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandling("Password dost match",400));
  }

  user.password=req.body.password;
  user.resetPasswordToken= undefined;
  user.resetPasswordExpire= undefined;

  await user.save();

  someToken(user,200,res)
})
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      name: { $regex: req.query.name, $options: "i" },
    });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "posts followers following"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const posts = user.posts;
    const followers = user.followers;
    const following = user.following;
    const userId = user._id;

    // Removing Avatar from cloudinary
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    await user.remove();

    // Logout user after deleting profile

    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    // Delete all posts of the user
    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(posts[i]);
      await cloudinary.v2.uploader.destroy(post.image.public_id);
      await post.remove();
    }

    // Removing User from Followers Following
    for (let i = 0; i < followers.length; i++) {
      const follower = await User.findById(followers[i]);

      const index = follower.following.indexOf(userId);
      follower.following.splice(index, 1);
      await follower.save();
    }

    // Removing User from Following's Followers
    for (let i = 0; i < following.length; i++) {
      const follows = await User.findById(following[i]);

      const index = follows.followers.indexOf(userId);
      follows.followers.splice(index, 1);
      await follows.save();
    }

    // removing all comments of the user from all posts
    const allPosts = await Post.find();

    for (let i = 0; i < allPosts.length; i++) {
      const post = await Post.findById(allPosts[i]._id);

      for (let j = 0; j < post.comments.length; j++) {
        if (post.comments[j].user === userId) {
          post.comments.splice(j, 1);
        }
      }
      await post.save();
    }
    // removing all likes of the user from all posts

    for (let i = 0; i < allPosts.length; i++) {
      const post = await Post.findById(allPosts[i]._id);

      for (let j = 0; j < post.likes.length; j++) {
        if (post.likes[j] === userId) {
          post.likes.splice(j, 1);
        }
      }
      await post.save();
    }

    res.status(200).json({
      success: true,
      message: "Profile Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};