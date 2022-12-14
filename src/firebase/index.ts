import * as admin from 'firebase-admin';

export type Role = 'patient' | 'doctor' | 'admin';

//Cuenta Admin
//admin@test.com    toor123

interface User {
    uid:string,
    email:string,
    userName:string,
    role: Role,
    isDisable: boolean;
}

const mapToUser = (user:admin.auth.UserRecord) =>  {
    const customClaims = (user.customClaims || { role:"" }) as {role?: string};

    const role = customClaims.role ? customClaims.role : "";


    return {
        uid: user.uid,
        email: user.email,
        userName: user.displayName,
        role,
        isDisableL: user.disabled
    }
};


export const createUser =async (
    displayName:string,
    email: string,
    password: string,
    role: Role
) => {
    const {uid} = await admin.auth().createUser({
        displayName,
        email,
        password
    })

    await admin.auth().setCustomUserClaims(uid, {role})
    return uid;
}


export const readUser = async(uid:string) => {
    const user = await admin.auth().getUser(uid);
    return mapToUser(user);   
}

export const getAllUsers = async () => {
    const listOfUsers = await admin.auth().listUsers(10);
    const users = listOfUsers.users.map(mapToUser);

    return users;
}

export const updateUser = async (uid:string, displayName: string) => {
    const user = await admin.auth().updateUser(uid, {
        displayName
    })


    return mapToUser(user);
}

export const disableUser =async (uid:string, disabled: boolean) => {
    const user = await admin.auth().updateUser(uid, {
        disabled
    })
}
