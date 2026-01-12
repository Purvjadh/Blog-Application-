import {Account,Client,ID} from 'appwrite';
import conf from '../conf/conf';


export class AuthService{
   client=new Client();
   account;//declaration

   constructor(){
    this.client
    .setEndpoint(conf.appwriteEndpoint)
    .setProject(conf.appwriteProjectId);

    this.account= new Account(this.client)//Initialization
   }

   async createAccount({email,password,name}){
    try {
      const userAccount = await this.account.create({
            userId:ID.unique(),
            email:email,
            password:password,
            name:name
        })
        console.log('userAccount',userAccount)
        if(userAccount){
            //call another method
            return await this.login({email,password})
        }else{
            return userAccount
        }
    } catch (error) {
        throw error;
    }
   }

  
   async login({email,password}){
    try {
     return await this.account.createEmailPasswordSession({
            email:email,
            password:password
        })    
  
    } catch (error) {
        throw error;
    }
   }

   async getCurrentUser(){
    try {
       return await this.account.get();
      
    } catch (error) {
        //console.log('appwrite service :: getCurrentUserError:: error',error)
        //return null
        if (error.code !== 401) {
        console.log("Appwrite service :: getCurrentUser :: error", error);
        }
    }

    return null
   }

   async logout(){
    try {
        await this.account.deleteSessions()
       
    } catch (error) {
        console.log('appwrite service :: logoutError :: error',error)
    }
   }

   

}

const authService = new AuthService()

export default authService



