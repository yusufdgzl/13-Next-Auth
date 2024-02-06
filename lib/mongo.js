import { MongoClient } from "mongodb";


async function ConnectToMongoDb(){
    const url = 'mongodb+srv://Miank12:Yusuf.dg12@atlascluster.eh8thnx.mongodb.net/?retryWrites=true&w=majority'

    const client = new MongoClient(url);

    return client;
}

export default ConnectToMongoDb

// import { MongoClient } from "mongodb";

// const url =
//   "mongodb+srv://Miank12:Yusuf.dg12@atlascluster.eh8thnx.mongodb.net/?retryWrites=true&w=majority";

// export const connectToDatabase = async () => {

//   const client = new MongoClient(url);
//   const db = client.db();
 
//   return {client,db};
// };
