import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from 'dotenv'
dotenv.config();


const pc = new Pinecone({
    apiKey:process.env.PINECONE_API_KEY
});

const getPineconeIndex = () =>{
    try {
        const indexName = process.env.PINECONE_INDEX;
        const index = pc.index(indexName);
        console.log(`Successfully connected to pinecone index : ${indexName}`);
        return index;
        
    } catch (error) {
        console.error("Error connected to Pinecone!", error);
        throw error;
        
    }
};


export {getPineconeIndex};