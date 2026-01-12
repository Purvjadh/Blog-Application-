import {ID,Client,Query,Storage, TablesDB} from 'appwrite';
import conf from '../conf/conf';


export class Service {
    client=new Client();
    tablesDB;
    storage;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteEndpoint)
        .setProject(conf.appwriteProjectId)

        this.tablesDB=new TablesDB(this.client);
        this.storage=new Storage(this.client)
    }

    async createPost({title,content,featuredImage,status,slug,userId}){
        try {
           return await this.tablesDB.createRow({
            databaseId:conf.appwriteDatabaseId,
            tableId:conf.appwriteTableId,
            rowId:ID.unique(),
            data:{
                title,
                content,
                featuredImage,
                status,
                slug,
                userId

            }          
           })
        } catch (error) {
            console.log('Appwrite error :: createPost :: error',error)
        }
    }

    async getPosts(){
        try {
           return await this.tablesDB.listRows({
                databaseId:conf.appwriteDatabaseId,
                tableId:conf.appwriteTableId,
                queries:[
                    Query.equal('status','active')
                ]
            })
        } catch (error) {
            console.log('Appwrite error :: getPosts:: error',error)
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.tablesDB.getRow({
                databaseId:conf.appwriteDatabaseId,
                tableId:conf.appwriteTableId,
                rowId:slug
            })
        } catch (error) {
            console.log('Appwrite error :: getPost :: error',error)
        }
    }

    async deletePost(slug){
        try {
           await this.tablesDB.deleteRow({
                databaseId:conf.appwriteDatabaseId,
                tableId:conf.appwriteTableId,
                rowId:slug
            })
            return true

        } catch (error) {
            console.log('Appwrite error :: deletePost :: error',error)
            return false
        }
    }

    async updatePost(slug,{title,status,featuredImage,content}){
        try {
           return await this.tablesDB.updateRow(
            conf.appwriteDatabaseId,
            conf.appwriteTableId,
            slug,
            {
                title,
                content,
                featuredImage,
                status
            }
           )
            
        } catch (error) {
            console.log('error :: updatePost :: appwrite error')
        }
    }

    //File Serivices

    async uploadFile(file){
       try {
         return await this.storage.createFile({
            bucketId:conf.appwriteBucketId,
            fileId:ID.unique(),
            file:file
        })
       } catch (error) {
        console.log('Appwrite error :: uploadFile :: error', error)
       }
    }

    async getFile(fileId){
        try{
           return await this.storage.getFile({
                bucketId:conf.appwriteBucketId,
                fileId:fileId
            })
        }catch(error){
            console.log('Appwrite error :: getFile :: error',error)
        }
    }

     getImageView(fileId){
        try {
            return  this.storage.getFileView({
                bucketId:conf.appwriteBucketId,
                fileId:fileId
            })
        } catch (error) {
            console.log('Appwrite error :: getImageView :: error',error)
        }
    }

     getPreviewImage(fileId){
        try {
            return  this.storage.getFilePreview({
                bucketId:conf.appwriteBucketId,
                fileId:fileId
            })
        } catch (error) {
            console.log('Appwrite error :: getPreviewImage :: error',error)
        }
    }

    async listAllFiles(){
        try {
           return await this.storage.listFiles({
                bucketId:conf.appwriteBucketId
            })
        } catch (error) {
            console.log('Appwrite error :: listAllFiles :: error',error)
        }
    }

    async deleteFile(fileId){
        try {
            return await this.storage.deleteFile({
                bucketId:conf.appwriteBucketId,
                fileId:fileId
            })

            return true
        } catch (error) {
            console.log('Appwrite error :: deleteFile :: error',error)
        }
    }

}


const appwriteService=new Service()

export default appwriteService

