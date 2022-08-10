import axios from "axios";
import { CREATE_PROFILE_REQUEST,
    CREATE_PROFILE_SUCCESS,
    CREATE_PROFILE_FAIL,
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
    CREATE_EXPRIENCE_REQUEST,
    CREATE_EXPRIENCE_SUCCESS,
    CREATE_EXPRIENCE_FAIL,
    DELETE_EXPRIENCE_REQUEST,
    DELETE_EXPRIENCE_SUCCESS,
    DELETE_EXPRIENCE_FAIL,
    CREATE_EDUCATION_REQUEST,
    CREATE_EDUCATION_SUCCESS,
    CREATE_EDUCATION_FAIL,
    DELETE_EDUCATION_REQUEST,
    DELETE_EDUCATION_SUCCESS,
    DELETE_EDUCATION_FAIL,
   } from "../constants/profileConstants";


//create product
export const newProfile=(pro)=>async(dispatch)=>{
    try {
        dispatch({
            type:CREATE_PROFILE_REQUEST
        })

        const {data}=await axios.post(`/api/v2/profile/new`,pro)
        dispatch({
            type:CREATE_PROFILE_SUCCESS,
            payload:data

        })
    } catch (error) {
        dispatch({
            type:CREATE_PROFILE_FAIL,
            payload:error.response.data.message
    
        })
    }
    }


    export const getALLProduct=()=>async(dispatch)=>{
        try {
            dispatch({
                type:GET_ALL_PROFILE_REQUEST
            })
            const {data}=await axios.get(`/api/v2/profile/get`)
            dispatch({
                type:GET_ALL_PROFILE_SUCCESS,
                payload:data,
            })
        } catch (error) {
            dispatch({
                type:GET_ALL_PROFILE_FAIL,
                payload:error.response.data.message
            })
        }
        }


        export const getProductDetails=(id)=>async(dispatch)=>{
            try {
                dispatch({
                    type:GET_DETAILS_REQUEST
                })
                const {data}=await axios.get(`/api/v2/profile/single/${id}`)
                dispatch({
                    type:GET_DETAILS_SUCCESS,
                    payload:data,
                })
            } catch (error) {
                dispatch({
                    type:GET_DETAILS_FAIL,
                    payload:error.response.data.message
                })
            }
            }

            export const userProductDetails=()=>async(dispatch)=>{
                try {
                    dispatch({
                        type:USER_PROFILE_REQUEST
                    })
                    const {data}=await axios.get(`/api/v2/my/profile`)
                    dispatch({
                        type:USER_PROFILE_SUCCESS,
                        payload:data,
                    })
                } catch (error) {
                    dispatch({
                        type:USER_PROFILE_FAIL,
                        payload:error.response.data.message
                    })
                }
                }


        export const delProfile=(id)=>async(dispatch)=>{
            try {
                dispatch({
                    type:DELETE_PROFILE_REQUEST
                })
                const {data}=await axios.delete(`/api/v2/profile/delete/${id}`)
                dispatch({
                    type:DELETE_PROFILE_SUCCESS,
                    payload:data,
                })
            } catch (error) {
                dispatch({
                    type:DELETE_PROFILE_FAIL,
                    payload:error.response.data.message
                })
            }
            }

//create product
export const newExprience=(pro)=>async(dispatch)=>{
    try {
        dispatch({
            type:CREATE_EXPRIENCE_REQUEST
        })

        const {data}=await axios.put(`/api/v2/experience`,pro)
        dispatch({
            type:CREATE_EXPRIENCE_SUCCESS,
            payload:data

        })
    } catch (error) {
        dispatch({
            type:CREATE_EXPRIENCE_FAIL,
            payload:error.response.data.message
    
        })
    }
    }

    export const delexpriences=(id)=>async(dispatch)=>{
        try {
            dispatch({
                type:DELETE_EXPRIENCE_REQUEST
            })
            const {data}=await axios.delete(`/api/v2/delete/experience/${id}`)
            dispatch({
                type:DELETE_EXPRIENCE_SUCCESS,
                payload:data,
            })
        } catch (error) {
            dispatch({
                type:DELETE_EXPRIENCE_FAIL,
                payload:error.response.data.message
            })
        }
        }

//create product
export const newEducation=(pro)=>async(dispatch)=>{
    try {
        dispatch({
            type:CREATE_EDUCATION_REQUEST
        })

        const {data}=await axios.put(`/api/v2/education`,pro)
        dispatch({
            type:CREATE_EDUCATION_SUCCESS,
            payload:data

        })
    } catch (error) {
        dispatch({
            type:CREATE_EDUCATION_FAIL,
            payload:error.response.data.message
    
        })
    }
    }

    export const delEducationsss=(id)=>async(dispatch)=>{
        try {
            dispatch({
                type:DELETE_EDUCATION_REQUEST
            })
            const {data}=await axios.delete(`/api/v2/delete/education/${id}`)
            dispatch({
                type:DELETE_EDUCATION_SUCCESS,
                payload:data,
            })
        } catch (error) {
            dispatch({
                type:DELETE_EDUCATION_FAIL,
                payload:error.response.data.message
            })
        }
        }







    ///ya bs errors ko null krna k kam ana haa
export const clearErrors=()=>async(dispatch)=>{
    dispatch({
      type:CLEAR_ERRORS
    })
}