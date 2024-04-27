import mongoose from "mongoose";

const Connection = async () => {
    const URL= 'mongodb://user2023:admin123@ac-9earnha-shard-00-00.ftgozek.mongodb.net:27017,ac-9earnha-shard-00-01.ftgozek.mongodb.net:27017,ac-9earnha-shard-00-02.ftgozek.mongodb.net:27017/?ssl=true&replicaSet=atlas-d2c5kq-shard-0&authSource=admin&retryWrites=true&w=majority'; 

    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console. log("“Database connected successfully");
    } catch(error){
        console.log("Error while connecting the database", error);
    }
}