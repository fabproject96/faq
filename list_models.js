import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyBB71OoQFYqVsWBqJaF20fFI6biFaqWaig");

async function listModels() {
  try {
    // Note: The SDK might not have a direct listModels method on the genAI object depending on version.
    // We'll try to fetch models via a direct fetch if necessary, but let's see if we can find a common one.
    console.log("Testing access to gemini-1.5-pro...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent("Say hello");
    console.log(result.response.text());
  } catch (error) {
    console.error("Error testing gemini-1.5-pro:", error);
  }
}

listModels();
