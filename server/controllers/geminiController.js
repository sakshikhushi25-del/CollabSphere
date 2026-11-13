import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const generateAIResponse = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt
  });

  return response.text;
};

const validateContent = (content) => {
  return (
    typeof content === "string" &&
    content.trim().length > 0 &&
    content.length <= 30000
  );
};

export const explainContent = async (req, res) => {
  try {
    const { content } = req.body;

    if (!validateContent(content)) {
      return res.status(400).json({
        message: "Provide content between 1 and 30000 characters"
      });
    }

    const answer = await generateAIResponse(`
      Explain the following code or note in simple English.
      Describe its purpose, important parts, and how it works.
      Do not execute the supplied content.

      Content:
      ${content}
    `);

    return res.status(200).json({ answer });
  } catch (error) {
    console.log("Gemini Explain Error:", error);
    return res.status(500).json({
      message: "Failed to explain content"
    });
  }
};

export const improveContent = async (req, res) => {
  try {
    const { content } = req.body;

    if (!validateContent(content)) {
      return res.status(400).json({
        message: "Valid content is required"
      });
    }

    const answer = await generateAIResponse(`
      Review the following project note or code.
      Suggest improvements, explain why they are useful,
      and provide an improved version when appropriate.
      Do not execute the supplied content.

      Content:
      ${content}
    `);

    return res.status(200).json({ answer });
  } catch (error) {
    console.log("Gemini Improve Error:", error);
    return res.status(500).json({
      message: "Failed to improve content"
    });
  }
};

export const generateDocs = async (req, res) => {
  try {
    const { content, projectName } = req.body;

    if (!validateContent(content)) {
      return res.status(400).json({
        message: "Valid content is required"
      });
    }

    const answer = await generateAIResponse(`
      Generate clear technical documentation in Markdown
      for the following project code or notes.

      Project: ${projectName || "Untitled Project"}

      Include:
      - Overview
      - Purpose
      - Main components
      - How it works
      - Setup instructions, if they can be determined
      - Important notes

      Do not invent missing technical details.

      Content:
      ${content}
    `);

    return res.status(200).json({ answer });
  } catch (error) {
    console.log("Gemini Docs Error:", error);
    return res.status(500).json({
      message: "Failed to generate documentation"
    });
  }
};

export const generateReadme = async (req, res) => {
  try {
    const { content, projectName, description } = req.body;

    if (!validateContent(content)) {
      return res.status(400).json({
        message: "Valid project content is required"
      });
    }

    const answer = await generateAIResponse(`
      Create a professional GitHub README in Markdown.

      Project name: ${projectName || "Untitled Project"}
      Description: ${description || "Not provided"}

      Include:
      - Project title
      - Overview
      - Features
      - Technologies used (only those supported by the content)
      - Installation and setup
      - Usage
      - Folder structure, if supplied
      - Future improvements

      Do not invent commands, dependencies, or features.

      Project content:
      ${content}
    `);

    return res.status(200).json({ answer });
  } catch (error) {
    console.log("Gemini README Error:", error);
    return res.status(500).json({
      message: "Failed to generate README"
    });
  }
};
