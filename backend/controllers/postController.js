const ErrorHandling = require("../utils/errorHandling");
const catchAsyncError=require("../meddleware/catchAsyncError");

const Post=require("../models/postModle");
const User=require("../models/userModle");
const Profile=require("../models/profileModle");

const cloudinary = require("cloudinary");

exports.createPost = async (req, res) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "posts",
    });
    const newPostData = {
      caption: req.body.caption,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      owner: req.user.id,
    };

    const post = await Post.create(newPostData);

    const user = await User.findById(req.user.id);

    user.posts.unshift(post._id);

    await user.save();
    res.status(201).json({
      success: true,
      message: "Post created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.likeAndUnlikePost=catchAsyncError(async(req,res,next)=>{
    const post=await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({
            success: false,
            message: "Post not found",
          });
    }

    if (post.likes.includes(req.user.id)) {
        postIndex=post.likes.indexOf(req.user.id);
        post.likes.splice(postIndex,1);
        await post.save();

        return res.status(200).json({
            success:true,
            message:"unLike ho gya shokria"
        })

    }else{
        post.likes.push(req.user.id);
        await post.save();
    
        return res.status(201).json({
            success:true,
            message:"Like ho gya shokria"
        })
    }

})

exports.delPost=catchAsyncError(async(req,res,next)=>{
    const post=await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({
            success: false,
            message: "Post not found",
          });
    }

    if (post.owner.toString() !== req.user.id.toString()) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized user",
        });
      }

    await post.remove();
    const user=await User.findById(req.user.id)
    userIndex=user.posts.indexOf(req.user.id);
    user.posts.splice(userIndex,1);
    await user.save();

    res.status(200).json({
        success: true,
        message: "Post deleted",
      });

})

exports.getPostOfFollowing=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.user.id)

    const posts=await Post.find({
        owner:{
            $in:user.following

        }
    }).populate("owner likes comments.user");

    res.status(200).json({
        success: true,
        posts: posts.reverse(),
      });
})

exports.updateCaption = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
  
      if (post.owner.toString() !== req.user.id.toString()) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }
  
      post.caption = req.body.caption;
      await post.save();
      res.status(200).json({
        success: true,
        message: "Post updated",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  exports.commentOnPost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
  
      let commentIndex = -1;
  
      // Checking if comment already exists
  
      post.comments.forEach((item, index) => {
        if (item.user.toString() === req.user.id.toString()) {
          commentIndex = index;
        }
      });
  
      if (commentIndex !== -1) {
        post.comments[commentIndex].comment = req.body.comment;
  
        await post.save();
  
        return res.status(200).json({
          success: true,
          message: "Dobara Slah dana ka leya shokria",
        });
      } else {
        post.comments.push({
          user: req.user.id,
          comment: req.body.comment,
        });
  
        await post.save();
        return res.status(200).json({
          success: true,
          message: "Slah dana ka leya shokria",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  exports.deleteComment = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
  
      // Checking If owner wants to delete
  
      if (post.owner.toString() === req.user.id.toString()) {
        if (req.body.commentId === undefined) {
          return res.status(400).json({
            success: false,
            message: "Comment Id is required",
          });
        }
  
        post.comments.forEach((item, index) => {
          if (item._id.toString() === req.body.commentId.toString()) {
            return post.comments.splice(index, 1);
          }
        });
  
        await post.save();
  
        return res.status(200).json({
          success: true,
          message: "Selected Comment has deleted",
        });
      } else {
        post.comments.forEach((item, index) => {
          if(item.user.toString() === req.user.id.toString()){
            return post.comments.splice(index, 1);
          }
        });
  
        await post.save();
  
        return res.status(200).json({
          success: true,
          message: "Your Comment has been deleted",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };