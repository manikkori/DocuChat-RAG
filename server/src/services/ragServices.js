import pdfParse from "pdf-parse/lib/pdf-parse.js";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { PineconeStore } from "@langchain/pinecone";
import { getPineconeIndex } from "./pineconeService.js";
import dotenv from "dotenv";
dotenv.config();

const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.HUGGINGFACEHUB_API_KEY,
});

export const processAndEmbedPDF = async (fileBuffer) => {
  try {
    //
    const pdfData = await pdfParse(fileBuffer);
    const extractedText = pdfData.text;

    console.log(`Extracted ${extractedText.lenght} characters from PDF.`);

    //text to chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.createDocuments([extractedText]);

    console.log(`Created ${docs.length} document chunks.`);

    // 3. Pinecone index laao aur data store karo
    const pineconeIndex = getPineconeIndex();

    console.log("Uploading chunks to Pinecone...");
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex,
      maxConcurrency: 5, // Rate limit errors se bachne ke liye
    });

    console.log("Successfully embedded and stored in Pinecone!");
    return docs.length;
  } catch (error) {
    console.error("Error in processAndEmbedPDF:", error);
    throw error;
  }
};
