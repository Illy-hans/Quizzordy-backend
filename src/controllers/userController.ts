import { User } from "../models/userModel";







const UsersController = {
    create: create,
    getId: getId,
    getAllUserInfo: getAllUserInfo, 
    updateUserInfo: updateUserInfo,
    clearTestData: clearTestData,
    updateUsersLikedPost: updateUsersLikedPost
};


export { UsersController };