import mongoose from 'mongoose'

const connect = () => {
    mongoose
      .connect(
       
        "mongodb+srv://thevijeeth:7Fv62OZWxT4IMJBA@express-mongo.rmjca.mongodb.net/?retryWrites=true&w=majority&appName=express-mongo",
        {
          dbName: "sailing_blog", 
        },
      )
      .then(() => console.log("Connection to MongoDB succeeded."))
      .catch((err) => console.log(`MongoDB connection failed. ${err}`));
  };
  
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error", err);
  });
  
  export default connect;