import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,CLEAR_ERRORS,REGISTER_REQUEST,REGISTER_SUCCESS,REGISTER_FAIL,LOAD_USER_REQUEST,LOAD_USER_SUCCESS,LOAD_USER_FAIL
,LOGOUT_SUCCESS,
LOGOUT_FAIL,
UPDATE_PROFILE_REQUEST,
UPDATE_PROFILE_SUCCESS,
UPDATE_PROFILE_FAIL,
UPDATE_PASSWORD_REQUEST,
UPDATE_PASSWORD_SUCCESS,
UPDATE_PASSWORD_FAIL,
FORGOT_PASSWORD_REQUEST,
FORGOT_PASSWORD_SUCCESS,
FORGOT_PASSWORD_FAIL,
RESET_PASSWORD_REQUEST,
RESET_PASSWORD_SUCCESS,
RESET_PASSWORD_FAIL,
ALL_USERS_REQUEST,
ALL_USERS_SUCCESS,
ALL_USERS_FAIL,
DELETE_USER_REQUEST,
DELETE_USER_SUCCESS,
DELETE_USER_FAIL,
DELETE_USER_RESET,
UPDATE_USER_REQUEST,
UPDATE_USER_SUCCESS,
UPDATE_USER_FAIL,
UPDATE_USER_RESET,
USER_DETAILS_REQUEST,
USER_DETAILS_SUCCESS,
USER_DETAILS_FAIL,
} from "../constants/userConstants"

import axios from "axios";
//login
export const loginUser = (email)=>async(dispatch)=>{

    try {
        dispatch({ type:LOGIN_REQUEST });
            const config= { Headers:{"Content-type":"application/json"} };
        const { data }=await axios.post(`/api/v2/login`,email,config)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:data.user
        })
        
    } catch (error) {
        dispatch({
            type:LOGIN_FAIL,
            payload:error.response.data.message
        });
    }
};
//register
export const signup = (userData)=>async(dispatch)=>{

    try {
        dispatch({ type:REGISTER_REQUEST });

        //kue ka img use honi ic leya multipart use hoa ha
            const config= { Headers:{"Content-type":"multipart/form-data"} };
        const { data }=await axios.post(`/api/v2/register`,userData,config)
        dispatch({
            type:REGISTER_SUCCESS,
            payload:data.user
        })
    } catch (error) {
        dispatch({
            type:REGISTER_FAIL,
            payload:error.response.data.message
        });
    }
};





//loard user,...
export const loardUser = ()=>async(dispatch)=>{

    try {
        dispatch({ type:LOAD_USER_REQUEST });
        const { data }=await axios.get(`/api/v2/me`)
        dispatch({
            type:LOAD_USER_SUCCESS,
            payload:data.user
        })
        
    } catch (error) {
        dispatch({
            type:LOAD_USER_FAIL,
            payload:error.response.data.message
        });
    }
};


//logout
export const logoutUser = ()=>async(dispatch)=>{

    try {
        dispatch({ type:LOAD_USER_REQUEST });
        await axios.get(`/api/v2/logout`)
        dispatch({ type:LOGOUT_SUCCESS })
        
    } catch (error) {
        dispatch({
            type:LOGOUT_FAIL,
            payload:error.response.data.message
        });
    }
};

// Clearing errors
export const clearErrors=()=> async (dispatch)=>{
    dispatch({ type:CLEAR_ERRORS })
}



//update profile
export const updateProfile = (userData)=>async(dispatch)=>{

    try {
        dispatch({ type:UPDATE_PROFILE_REQUEST });
        const config= { Headers:{"Content-type":"multipart/form-data"} };
        const { data }=await axios.put(`/api/v2/me/update`,userData,config)
        dispatch({
            type:UPDATE_PROFILE_SUCCESS,
            payload:data.success,
        });
    } catch (error) {
        dispatch({
            type:UPDATE_PROFILE_FAIL,
            payload:error.response.data.message,
        });
    }
};

//Update Pass
export const updatePassword = (pass)=>async(dispatch)=>{

    try {
        dispatch({ type:UPDATE_PASSWORD_REQUEST });

        //kue ka img use honi ic leya multipart use hoa ha
            const config= { Headers:{"Content-type":"application/json"} };
        const { data }=await axios.put(`/api/v2/password/update`,pass,config)
        dispatch({
            type:UPDATE_PASSWORD_SUCCESS,
            payload:data.user
        })
    } catch (error) {
        dispatch({
            type:UPDATE_PASSWORD_FAIL,
            payload:error.response.data.message
        });
    }
}

//forgot pass,...

export const forgotPassword = (email)=>async(dispatch)=>{

    try {
        dispatch({ type:FORGOT_PASSWORD_REQUEST });

        //kue ka img use honi ic leya multipart use hoa ha
            const config= { Headers:{"Content-type":"application/json"} };
        const { data }=await axios.post(`/api/v2/password/forgot`,email,config)
        dispatch({
            type:FORGOT_PASSWORD_SUCCESS,
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:FORGOT_PASSWORD_FAIL,
            payload:error.response.data.message
        });
    }
};


//reset pass,...

export const resetPassword = (token,pass)=>async(dispatch)=>{

    try {
        dispatch({ type:RESET_PASSWORD_REQUEST });

        //kue ka img use honi ic leya multipart use hoa ha
            const config= { Headers:{"Content-type":"application/json"} };
        const { data }=await axios.put(`/api/v2/password/reset/${token}`,pass,config)
        dispatch({
            type:RESET_PASSWORD_SUCCESS,
            payload:data.success,
        })
    } catch (error) {
        dispatch({
            type:RESET_PASSWORD_FAIL,
            payload:error.response.data.message
        });
    }
};

export const getAllUsers =
  (name = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: "allUsersRequest",
      });

      const { data } = await axios.get(`/api/v2/users?name=${name}`);
      dispatch({
        type: "allUsersSuccess",
        payload: data.users,
      });
    } catch (error) {
      dispatch({
        type: "allUsersFailure",
        payload: error.response.data.message,
      });
    }
  };

  export const getFollowingPosts = () => async (dispatch) => {
    try {
      dispatch({
        type: "postOfFollowingRequest",
      });
  
      const { data } = await axios.get("/api/v2/posts");
      dispatch({
        type: "postOfFollowingSuccess",
        payload: data.posts,
      });
    } catch (error) {
      dispatch({
        type: "postOfFollowingFailure",
        payload: error.response.data.message,
      });
    }
  };

  export const likePost = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "likeRequest",
      });
  
      const { data } = await axios.get(`/api/v2/post/${id}`);
      dispatch({
        type: "likeSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "likeFailure",
        payload: error.response.data.message,
      });
    }
  };



  export const addCommentOnPost = (id, comment) => async (dispatch) => {
    try {
      dispatch({
        type: "addCommentRequest",
      });
  
      const { data } = await axios.put(
        `/api/v2/post/comment/${id}`,
        {
          comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "addCommentSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "addCommentFailure",
        payload: error.response.data.message,
      });
    }
  };
  
  export const deleteCommentOnPost = (id, commentId) => async (dispatch) => {
    try {
      dispatch({
        type: "deleteCommentRequest",
      });
  
      const { data } = await axios.delete(`/api/v2/post/comment/${id}`, {
        data: { commentId },
      });
      dispatch({
        type: "deleteCommentSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "deleteCommentFailure",
        payload: error.response.data.message,
      });
    }
  };
  
  export const createNewPost = (caption) => async (dispatch) => {
    try {
      dispatch({
        type: "newPostRequest",
      });
  
      const { data } = await axios.post(
        `/api/v2/post/upload`,caption,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "newPostSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "newPostFailure",
        payload: error.response.data.message,
      });
    }
  };
  
  export const updatePost = (caption, id) => async (dispatch) => {
    try {
      dispatch({
        type: "updateCaptionRequest",
      });
  
      const { data } = await axios.put(
        `/api/v2/post/${id}`,
        {
          caption,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "updateCaptionSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updateCaptionFailure",
        payload: error.response.data.message,
      });
    }
  };
  
  export const deletePost = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "deletePostRequest",
      });
  
      const { data } = await axios.delete(`/api/v2/post/${id}`);
      dispatch({
        type: "deletePostSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "deletePostFailure",
        payload: error.response.data.message,
      });
    }
  };
  

  export const getMyPosts = () => async (dispatch) => {
    try {
      dispatch({
        type: "myPostsRequest",
      });
  
      const { data } = await axios.get("/api/v2/my/posts");
      dispatch({
        type: "myPostsSuccess",
        payload: data.posts,
      });
    } catch (error) {
      dispatch({
        type: "myPostsFailure",
        payload: error.response.data.message,
      });
    }
  };

  export const followAndUnfollowUser = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "followUserRequest",
      });
  
      const { data } = await axios.get(`/api/v2/follow/${id}`);
      dispatch({
        type: "followUserSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "followUserFailure",
        payload: error.response.data.message,
      });
    }
  };
  

  export const getUserPosts = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "userPostsRequest",
      });
  
      const { data } = await axios.get(`/api/v2/userposts/${id}`);
      dispatch({
        type: "userPostsSuccess",
        payload: data.posts,
      });
    } catch (error) {
      dispatch({
        type: "userPostsFailure",
        payload: error.response.data.message,
      });
    }
  };
  
  export const getUserProfile = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "userProfileRequest",
      });
  
      const { data } = await axios.get(`/api/v2/user/${id}`);
      dispatch({
        type: "userProfileSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "userProfileFailure",
        payload: error.response.data.message,
      });
    }
  };

  export const deleteMyProfile = () => async (dispatch) => {
    try {
      dispatch({
        type: "deleteProfileRequest",
      });
  
      const { data } = await axios.delete("/api/v2/delete/me");
  
      dispatch({
        type: "deleteProfileSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "deleteProfileFailure",
        payload: error.response.data.message,
      });
    }
  };
  