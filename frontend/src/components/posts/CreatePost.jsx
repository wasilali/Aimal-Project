import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost, loardUser } from "../../actions/userAction";
import "./NewPost.css";
const NewPost = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, message } = useSelector((state) => state.like);
  const [user,setUser]=useState({
    caption:"",
   
})

const {caption}=user
const [avatarPreview,setAvatarPreview]= useState("")
const [avatar,setAvatar]=useState()

const registerDataChange=(e)=>{
  if(e.target.name==="image"){
   const reader=new FileReader()
   reader.onload=()=>{
      if(reader.readyState===2){
          setAvatarPreview(reader.result)
          setAvatar(reader.result)
      }
   }
   const file=e.target.files[0]
  
     reader.readAsDataURL(file)
   
  }else{
    setUser({...user,[e.target.name]:e.target.value})
}
  }

  function submitHandler(e) {
    e.preventDefault()
    
    const myForm=new FormData()
    myForm.set("caption",caption)

    myForm.set("avatar",avatar)
    console.log(caption)
    dispatch(createNewPost(myForm));
  }

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   await dispatch(createNewPost(caption, image));
  //   dispatch(loardUser());
  // };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message, alert]);

  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
        <Typography variant="h3">New Post</Typography>

        {avatarPreview && <img src={avatarPreview} alt="post" />}
        <input
      type="file"
      placeholder="add Image"
      name="image"
      minLength="6"
      onChange={registerDataChange}
    />
      <input type="text" placeholder="caption" name="caption" required value={caption} onChange={registerDataChange} />
        {/* <Button disabled={loading} type="submit">
          Post
        </Button> */}
        <button disabled={loading} type="submit" class="btn btn-outline-info">Create</button>
      </form>
    </div>
  );
};

export default NewPost;
