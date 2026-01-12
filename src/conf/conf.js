const conf = {
    appwriteEndpoint : String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteProjectName : String(import.meta.env.VITE_APPWRITE_PROJECT_NAME),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteTableId : String(import.meta.env.VITE_APPWRITE_TABLE_ID),
}

export default conf;