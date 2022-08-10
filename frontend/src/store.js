import { createStore ,combineReducers,applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { accountReducer, allUsersReducer, forgotPassReducer, likeReducer, myPostsReducer, postOfFollowingReducer, userPostsReducer, userProfileReducer, userReducer } from "./reducers/userReducer";
import { addExprienceReducer, deleteExprienceReducer, deleteProfileReducer, getProfileDetaiuls, newProfileReducer, profileReducer } from "./reducers/profileReducer";

const reducer=combineReducers({
    user:userReducer,
    account:accountReducer,
    profile:newProfileReducer,
    allProfiles:profileReducer,
    profileDetails:getProfileDetaiuls,
    delprofile:deleteProfileReducer,
    exprience:addExprienceReducer,
    delexprience:deleteExprienceReducer,
    forgotPassword:forgotPassReducer,
    postOfFollowing: postOfFollowingReducer,
    allUsers: allUsersReducer,
    like: likeReducer,
    myPosts: myPostsReducer,
    userProfile: userProfileReducer,
    userPosts: userPostsReducer,
});
let initialState= {

};

const middleware= [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store;
