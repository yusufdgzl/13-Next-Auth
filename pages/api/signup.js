import passwordHash from "@/lib/argon2";
import ConnectToMongoDb from "@/lib/mongo";

async function handler(req, res) {
  if (req.method === "POST") {
    const newUser = req.body;

    const hash = await passwordHash(newUser.password);

    const client = await ConnectToMongoDb();

    if(newUser.password.length < 6 || newUser.name === "" || newUser.surname === ""){
      res.status(402).json({message:'Password is to small or user infos is empty!!'});
      return ;
    } 

    try {
      await client.connect();
      const db = client.db();
      const result = await db.collection("Users").insertOne({...newUser,password:hash});
    } catch (err) {
      console.log(err);
    } finally {
      client.close();
    }

    res.status(201).json({ message: "Created user succesfully..." });
  } else {
    return;
  }
}

export default handler;
