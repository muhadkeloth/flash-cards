// import OpenAI from 'openai';
import { GoogleGenerativeAI } from "@google/generative-ai";

// const openai = new OpenAI({
//   baseURL: 'https://api.deepseek.com',
//   apiKey: process.env.OPENAI_API_KEY, // Ensure the API key is in your .env file
// });

export async function POST(req) {
    try {
      const { text } = await req.json();
  
      if (!text) {
        return new Response(
          JSON.stringify({ error: 'Text input is required' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      console.log("Calling gemini API...");



      const apiKey = process.env.GOOGLE_AI_API_KEY || '';

      const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const messages = [
//   {
//     role: 'system',
//     content: 'You are a helpful assistant that generates flashcards. Each flashcard contains a question and an answer.',
//   },
//   {
//     role: 'user',
//     content: `Create flashcards from the following text. Provide them in JSON format with 'question' and 'answer' as keys:\n\n${text}`,
//   },
// ];

const prompt = `You are a helpful assistant that generates flashcards. Each flashcard contains a question and an answer.
    
    Create flashcards from the following text. Provide them in JSON format with 'question' and 'answer' as keys:
    
    ${text}`;

const result = await model.generateContent(prompt);
const responseText = result.response.text();


if (!responseText) {
  return new Response(
    JSON.stringify({ error: 'No content received from gemini' }),
    { status: 500, headers: { 'Content-Type': 'application/json' } }
  );
}

// Step 4: Attempt to parse the flashcards
let flashcards;
try {

        flashcards = responseText;
        const cleanedResponse = responseText.replace(/```json|```/g, "").trim();
        flashcards = JSON.parse(cleanedResponse);
        console.log("Parsed flashcards:", flashcards);  // Log the parsed flashcards
      } catch (err) {
        console.error("Error parsing the response:", err);
        return new Response(
          JSON.stringify({ error: 'Failed to parse gemini response' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(JSON.stringify(flashcards), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error communicating with gemini:', error);
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

// export async function POST(req) {
//   try {
//     // console.log("req -->",req)
//     // Step 1: Extract 'text' from the request body
//     const { text } = await req.json();
//     // console.log("Received text:", text);  // Log the input text

//     if (!text) {
//       return new Response(
//         JSON.stringify({ error: 'Text input is required' }),
//         { status: 400, headers: { 'Content-Type': 'application/json' } }
//       );
//     }

//     // Step 2: Make request to OpenAI API to generate flashcards
//     console.log("Calling OpenAI API...");
//     const completion = await openai.chat.completions.create({
//       // model: 'gpt-3.5-turbo',
//       messages: [
//         {
//           role: 'system',
//           content: 'You are a helpful assistant that generates flashcards. Each flashcard contains a question and an answer.',
//         },
//         {
//           role: 'user',
//           content: `Create flashcards from the following text. Provide them in JSON format with 'question' and 'answer' as keys:\n\n${text}`,
//         },
//       ],
//       model: "deepseek-chat",
//     });

//     console.log("OpenAI response:", completion);  // Log the full response from OpenAI
//     console.log('output',completion.choices[0].message.content);
//     // Step 3: Extract the response content and parse it
//     const result = completion.choices[0]?.message?.content;
//     console.log("Extracted content:", result);  // Log the extracted content

//     if (!result) {
//       return new Response(
//         JSON.stringify({ error: 'No content received from OpenAI' }),
//         { status: 500, headers: { 'Content-Type': 'application/json' } }
//       );
//     }

//     // Step 4: Attempt to parse the flashcards
//     let flashcards;
//     try {
//       flashcards = JSON.parse(result);
//       console.log("Parsed flashcards:", flashcards);  // Log the parsed flashcards
//     } catch (err) {
//       console.error("Error parsing the response:", err);
//       return new Response(
//         JSON.stringify({ error: 'Failed to parse ChatGPT response' }),
//         { status: 500, headers: { 'Content-Type': 'application/json' } }
//       );
//     }

//     // Step 5: Return the generated flashcards
//     return new Response(JSON.stringify(flashcards), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Error communicating with OpenAI:', error);
//     return new Response(
//       JSON.stringify({ error: 'Internal server error' }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }
