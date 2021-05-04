export const LOCALBASEAPI = "http://192.168.1.8:3000";
export const SERVERBASEAPI = "https://project-x2.herokuapp.com";
export const BASEAPI = SERVERBASEAPI;
export const USERBASEAPI = BASEAPI + "/users";
export const LOGINAPI = USERBASEAPI + "/login";
export const SIGNUPAPI = USERBASEAPI + "/register";
export const USERACTIVE = USERBASEAPI + "/active";
export const ROOMBASEAPI = BASEAPI + "/rooms";
export const GETROOMS = ROOMBASEAPI + "/all";
export const ROOMMEMUPDATE = ROOMBASEAPI + "/updateMember";
export const ALLUSERSAPI = USERBASEAPI + "/all";
export const ADDNEWROOM = ROOMBASEAPI + "/new";
export const PATCHUSER = USERBASEAPI + "/update";
export const PATCHROOM = ROOMBASEAPI + "/update";
export const LEAVEROOM = ROOMBASEAPI + "/leave";
export const REMOVEMEMBER = ROOMBASEAPI + "/RemoveMember";
export const ADDMEMBER = ROOMBASEAPI + "/AddMember";
export const UPDATEPROFILEPIC = USERBASEAPI + "/profile_pic";
export const CHECKUSERCONTACTS = USERBASEAPI + "/CheckContacts";
