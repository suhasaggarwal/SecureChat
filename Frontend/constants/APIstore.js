export const LOCALBASEAPI = 'http://172.16.12.22:3000';
export const SERVERBASEAPI = 'https://project-x2.herokuapp.com';
export const BASEAPI = LOCALBASEAPI;
export const USERBASEAPI = BASEAPI + '/users';
export const LOGINAPI = USERBASEAPI + '/login';
export const SIGNUPAPI = USERBASEAPI + '/register';
export const USERACTIVE = USERBASEAPI + '/active';
export const ROOMBASEAPI = BASEAPI + '/rooms';
export const GETROOMS = ROOMBASEAPI + '/all';
export const ROOMMEMUPDATE = ROOMBASEAPI + '/updateMember';
export const ALLUSERSAPI = USERBASEAPI + '/all';
export const ADDNEWROOM = ROOMBASEAPI + '/new';
export const PATCHUSER = USERBASEAPI + '/update';
export const PATCHROOM = ROOMBASEAPI + '/update';
export const LEAVEROOM = ROOMBASEAPI + '/leave';
export const REMOVEMEMBER = ROOMBASEAPI + '/RemoveMember';
export const ADDMEMBER = ROOMBASEAPI + '/AddMember';
export const UPDATEPROFILEPIC = USERBASEAPI + '/profile_pic';
export const CHECKUSERCONTACTS = USERBASEAPI + '/CheckContacts';

export const CHAIN = 'http://172.16.12.22:8000/wallet';
export const NEWWALLET = CHAIN + '/NewWallet';
export const GETWALLET = CHAIN + '/getWallet';
