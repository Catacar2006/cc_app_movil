import { Platform } from "react-native";
import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";
import SignIn from "../app/(auth)/sign-in";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.aora",
  projecId: "66ea4ef4002620332451",
  databaseId: "66ea5366003a8871275a",
  usersCollectionId: "66ea53b1000502d5d0a1",
  videosCollectionId: "66ea53ef0016c6f39f46",
  storageId: "66ea57eb000dd40bb667",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projecId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases = new Databasestabases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID,unique(),
            email,
           password,
           username 
        )

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await SignIn(email, password)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.usersCollectionId,
            ID.unique(),
            {
                accountid: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        );

        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export async function SignIn( email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password)

        return session;
    } catch (error) {
        throw new Error(error);
    }
}