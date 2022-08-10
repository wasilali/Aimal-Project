import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,CLEAR_ERRORS,REGISTER_REQUEST,REGISTER_SUCCESS,REGISTER_FAIL,LOAD_USER_REQUEST,LOAD_USER_SUCCESS,LOAD_USER_FAIL
    ,LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,
   
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_RESET,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_RESET,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,

} from "../constants/userConstants"

export const userReducer = (state={},action)=>{
        switch (action.type) {
            case LOGIN_REQUEST:
               case REGISTER_REQUEST:
                case LOAD_USER_REQUEST:
                return {
                    loading:true,
                    isAuthenticated:false,
                }
                case LOGOUT_SUCCESS:
                    return {
                        loading:false,
                        isAuthenticated:false,
                        user:null,
                    }
                case LOGIN_SUCCESS:
                   case REGISTER_SUCCESS:
                    case LOAD_USER_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        isAuthenticated:true,
                        user:action.payload,
                    }
                    case LOGOUT_FAIL:
                        return {
                            ...state,
                            error:action.payload,
                            isAuthenticated:true,
                        }
                    case LOGIN_FAIL:
                       case REGISTER_FAIL:
                        return {
                            ...state,
                            loading:false,
                            isAuthenticated:false,
                            user:null,
                            error:action.payload,
                    }
                    case LOAD_USER_FAIL:
                        return {
                            loading:false,
                            isAuthenticated:false,
                            user:null,
                            error:action.payload,
                        }
                    case CLEAR_ERRORS:
                        return {
                            ...state,
                            error:null,
                        }
        
            default:
                return state;
        }
}

//update profile

export const accountReducer=(state={},action)=>{
        switch (action.type) {
            case UPDATE_PROFILE_REQUEST:
                case UPDATE_PASSWORD_REQUEST:
                    case UPDATE_USER_REQUEST:
                        case DELETE_USER_REQUEST:
                return {
                    ...state,
                    loading:true,

                }

            case UPDATE_PROFILE_SUCCESS:
                case UPDATE_PASSWORD_SUCCESS:
                    case UPDATE_USER_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    isUpdated:action.payload,
                }
                case DELETE_USER_SUCCESS:
                    return {
                      ...state,
                      loading: false,
                      isDeleted: action.payload.success,
                      message: action.payload.message,
                    };
            case UPDATE_PROFILE_FAIL:
                case UPDATE_PASSWORD_FAIL:
                    case UPDATE_USER_FAIL:
                        case DELETE_USER_FAIL:
                return {
                    ...state,
                    loading:false,
                    error:action.payload,
                }
                case UPDATE_PROFILE_RESET:
                    case UPDATE_PASSWORD_RESET:
                        case UPDATE_USER_RESET:
                    return{
                        ...state,
                        isUpdated:false
                    }
                    case DELETE_USER_RESET:
                        return {
                          ...state,
                          isDeleted: false,
                        };
                    case CLEAR_ERRORS:
                        return {
                            ...state,
                            error:null,
                        }
            
        
            default:
                return state;
        }
}

export const forgotPassReducer=(state={},action)=>{
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading:true,
                error:null,
            }

        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading:false,
                message:action.payload,
            }
            case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading:false,
                success:action.payload,
            }
        case FORGOT_PASSWORD_FAIL:
            case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading:false,

                error:action.payload,
            }
                case CLEAR_ERRORS:
                    return {
                        ...state,
                        error:null,
                    }
        
    
        default:
            return state;
    }
}

export const postOfFollowingReducer=(state={posts :[]},action)=>{
    switch (action.type) {
        case "postOfFollowingRequest":
            return {
                
                loading : true,
            }

        case "postOfFollowingSuccess":
            return {
                ...state,
                loading:false,
                posts : action.payload
            }
            case "postOfFollowingFailure":
            return {
                ...state,
                loading:false,

                error:action.payload,
            }
                case CLEAR_ERRORS:
                    return {
                        ...state,
                        error:null,
                    }
        
    
        default:
            return state;
    }
}

export const allUsersReducer=(state={users :[]},action)=>{
    switch (action.type) {
        case "allUsersRequest":
            return {
                
                loading : true,
            }

        case "allUsersSuccess":
            return {
                ...state,
                loading:false,
                users : action.payload
            }
            case "allUsersFailure":
            return {
                ...state,
                loading:false,

                error:action.payload,
            }
                case CLEAR_ERRORS:
                    return {
                        ...state,
                        error:null,
                    }
        
    
        default:
            return state;
    }
}

export const likeReducer=(state={},action)=>{
    switch (action.type) {
        case "likeRequest":
        case "addCommentRequest":
            case "deleteCommentRequest":
                case "newPostRequest":
                    case "updateCaptionRequest":
                        case "deletePostRequest":
                            case "followUserRequest":
                                case "deleteProfileRequest":

            return {
                ...state,
                loading : true,
            }

        case "likeSuccess":
        case "addCommentSuccess":
            case "deleteCommentSuccess":
                case "newPostSuccess":
                    case "updateCaptionSuccess":
                        case "deletePostSuccess":
                            case "followUserSuccess":
                                case "deleteProfileSuccess":

            return {
                ...state,
                loading:false,
                message :action.payload
            }
            case "likeFailure":
            case "addCommentFailure":
                case "deleteCommentFailure":
                    case "newPostFailure":
                        case "updateCaptionFailure":
                            case "deletePostFailure":
                                case "followUserFailure":
                                    case "deleteProfileFailure":

            return {
                ...state,
                loading:false,

                error:action.payload,
            }
                case CLEAR_ERRORS:
                    return {
                        ...state,
                        error:null,
                    }
        case "clearMessage":
            return {
                ...state,
                message:null
            }
    
        default:
            return state;
    }
}

export const userPostsReducer=(state={posts:[]},action)=>{
    switch (action.type) {
        case "userPostsRequest":
            return {
                ...state,
                loading : true,
            }

        case "userPostsSuccess":
            return {
                ...state,
                loading:false,
                posts : action.payload
            }
            case "userPostsFailure":
            return {
                ...state,
                loading:false,

                error:action.payload,
            }
                case CLEAR_ERRORS:
                    return {
                        ...state,
                        error:null,
                    }
        
    
        default:
            return state;
    }
}

export const userProfileReducer=(state={},action)=>{
    switch (action.type) {
        case "userProfileRequest":
            return {
                ...state,
                loading : true,
            }

        case "userProfileSuccess":
            return {
                ...state,
                loading:false,
                user : action.payload
            }
            case "userProfileFailure":
            return {
                ...state,
                loading:false,

                error:action.payload,
            }
                case CLEAR_ERRORS:
                    return {
                        ...state,
                        error:null,
                    }
        
    
        default:
            return state;
    }
}

export const myPostsReducer=(state={},action)=>{
    switch (action.type) {
        case "myPostsRequest":
            return {
                ...state,
                loading : true,
            }

        case "myPostsSuccess":
            return {
                ...state,
                loading:false,
                posts : action.payload
            }
            case "myPostsFailure":
            return {
                ...state,
                loading:false,

                error:action.payload,
            }
                case CLEAR_ERRORS:
                    return {
                        ...state,
                        error:null,
                    }
        
    
        default:
            return state;
    }
}