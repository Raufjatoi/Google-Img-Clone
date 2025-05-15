import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export async function generateImages(prompt: string, numImages = 4): Promise<string[]> {
  try {
    // Used gemini-1.5-flash as demo change it to image one 
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Generate multiple images
    const results = await Promise.all(
      Array(numImages).fill(0).map(async () => {
        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: `Generate an image of: ${prompt}` }] }],
        });
        
        const response = result.response;
        // Extract image data from the response
        const imageData = response.candidates[0].content.parts.find(part => part.inlineData)?.inlineData.data;
        
        if (!imageData) {
          throw new Error("No image data returned from the API");
        }
        
        return `data:image/jpeg;base64,${imageData}`;
      })
    );
    
    return results;
  } catch (error) {
    console.error("Error generating images:", error);
    return [];
  }
}
