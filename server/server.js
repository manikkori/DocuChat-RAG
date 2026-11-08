import app from "./src/app.js";
import dotenv from 'dotenv'
dotenv.config();
import { getPineconeIndex } from "./src/services/pineconeService.js";


const PORT = process.env.PORT || 5000;

app.listen(PORT, async ()=>{
    console.log(`Server is running on https://localhost:${PORT}`);

    try {
        await getPineconeIndex();
    } catch (error) {
        console.log("failed to initialized Pinecone vector database! ");
        
    }
});