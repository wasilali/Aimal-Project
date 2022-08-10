import { CREATE_PROFILE_REQUEST,
        CREATE_PROFILE_SUCCESS,
        CREATE_PROFILE_FAIL,
        CREATE_PROFILE_RESET,
        CLEAR_ERRORS,
        GET_ALL_PROFILE_REQUEST,
        GET_ALL_PROFILE_SUCCESS,
        GET_ALL_PROFILE_FAIL,
        GET_DETAILS_REQUEST,
        GET_DETAILS_SUCCESS,
        GET_DETAILS_FAIL,
        USER_PROFILE_REQUEST,
        USER_PROFILE_SUCCESS,
        USER_PROFILE_FAIL,
        DELETE_PROFILE_REQUEST,
        DELETE_PROFILE_SUCCESS,
        DELETE_PROFILE_FAIL,
        DELETE_PROFILE_RESET,
        CREATE_EXPRIENCE_REQUEST,
        CREATE_EXPRIENCE_SUCCESS,
        CREATE_EXPRIENCE_FAIL,
        CREATE_EXPRIENCE_RESET,
        DELETE_EXPRIENCE_REQUEST,
        DELETE_EXPRIENCE_SUCCESS,
        DELETE_EXPRIENCE_FAIL,
        DELETE_EXPRIENCE_RESET,
        CREATE_EDUCATION_REQUEST,
        CREATE_EDUCATION_SUCCESS,
        CREATE_EDUCATION_FAIL,
        CREATE_EDUCATION_RESET,
        DELETE_EDUCATION_REQUEST,
        DELETE_EDUCATION_SUCCESS,
        DELETE_EDUCATION_FAIL,
        DELETE_EDUCATION_RESET,

       } from "../constants/profileConstants";

//create products
export const newProfileReducer=(state={profile:{}},action)=>{
    switch (action.type) {
        case CREATE_PROFILE_REQUEST:
             
           return {
            ...state,
               loading:true,
           }
           case CREATE_PROFILE_SUCCESS:
             
              return {
                  loading:false,
                  success:action.payload.success,
                  profile:action.payload.profile,
                }
              case CREATE_PROFILE_RESET:
             
                return {
                    ...state,
                    loading:false,
                    success:false
                }
              case CREATE_PROFILE_FAIL:
             
                  return {
                      loading:false,
                      error:"Profile Is Already Exist"
                  }
                   case CLEAR_ERRORS:
             
                       return {
                           ...state,
                           error:null
                       }
        default:
           return state;
    }
}

export const profileReducer=(state={profiles:[]},action)=>{
    switch (action.type) {
        case GET_ALL_PROFILE_REQUEST:
           return {
               loading:true,
               profiles:[]
           }
           case GET_ALL_PROFILE_SUCCESS:
             
            return {
                loading:false,
                success:action.payload.success,
                profiles:action.payload.profiles,
              }
              case GET_ALL_PROFILE_FAIL:

                  return {
                      loading:false,
                      error:"action.payload",
                      profiles:null,
                  }
                  case CLEAR_ERRORS:
             
                      return {
                          ...state,
                          error:null
                      }
        default:
           return state;
    }
  
  }

  //create products
export const getProfileDetaiuls=(state={profile:{}},action)=>{
    switch (action.type) {
        case GET_DETAILS_REQUEST:
        case USER_PROFILE_REQUEST:
           return {
            ...state,
               loading:true,
           }
           case GET_DETAILS_SUCCESS:
           case USER_PROFILE_SUCCESS:
             
              return {
                  loading:false,
                  profile:action.payload.profile,
                }

              case GET_DETAILS_FAIL:
              case  USER_PROFILE_FAIL:
                  return {
                      loading:false,
                      error:"Profile Is Not Found",
                      profile:null,
                  }
                   case CLEAR_ERRORS:
             
                       return {
                           ...state,
                           error:null
                       }
        default:
           return state;
    }
}



export const deleteProfileReducer=(state={},action)=>{
    switch (action.type) {
            case DELETE_PROFILE_REQUEST:
            return {
                ...state,
                loading:true,

            }
            case DELETE_PROFILE_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  isDeleted: action.payload.success,
                  message: "Successfully Deleted",
                }
            case DELETE_PROFILE_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
            }
                case DELETE_PROFILE_RESET:
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

//create products
export const addExprienceReducer=(state={},action)=>{
    switch (action.type) {
        case CREATE_EXPRIENCE_REQUEST:
             case CREATE_EDUCATION_REQUEST:
           return {
            ...state,
               loading:true,
           }
           case CREATE_EXPRIENCE_SUCCESS:
           case CREATE_EDUCATION_SUCCESS:
             
              return {
                  loading:false,
                  success:action.payload.success
                }
              case CREATE_EXPRIENCE_RESET:
                case CREATE_EDUCATION_RESET:
             
                return {
                    ...state,
                    loading:false,
                    success:false
                }
              case CREATE_EXPRIENCE_FAIL:
             case CREATE_EDUCATION_FAIL:
                  return {
                      loading:false,
                      error:action.payload
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

export const deleteExprienceReducer=(state={},action)=>{
    switch (action.type) {
            case DELETE_EXPRIENCE_REQUEST:
                case DELETE_EDUCATION_REQUEST:
            return {
                ...state,
                loading:true,

            }
            case DELETE_EXPRIENCE_SUCCESS:
                case DELETE_EDUCATION_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  isDeleted: action.payload.success,
                  message: "Successfully Deleted",
                }
            case DELETE_EXPRIENCE_FAIL:
                case DELETE_EDUCATION_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
            }
                case DELETE_EXPRIENCE_RESET:
                case DELETE_EDUCATION_RESET:

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
