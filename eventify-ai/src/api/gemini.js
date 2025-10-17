import axios from "axios";

const GEMINI_API_URL = "https://gemini.googleapis.com/v1beta2/models/text-bison-001:generateText"; // Replace with current endpoint

export const getGeminiSuggestion = async (apiKey, prompt) => {
  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        prompt: {
          text: prompt,
        },
        temperature: 0.7,
        maxOutputTokens: 150,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.candidates[0].output || "No suggestion generated.";
  } catch (err) {
    console.error("Gemini API error:", err);
    return "AI service unavailable right now.";
  }
};
