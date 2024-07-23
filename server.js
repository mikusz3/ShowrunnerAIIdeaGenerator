require('dotenv').config();
const express = require('express');
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const port = 3000;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(express.json());

app.post('/generate-idea', async (req, res) => {
  try {
    const { genre, subgenre, storyType, personalTouch } = req.body;

    // Generate title
    const titleResponse = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Create a catchy title for a ${genre} TV show with ${subgenre} elements, set in a ${storyType} world with a ${personalTouch} touch.`,
      max_tokens: 50
    });
    const title = titleResponse.data.choices[0].text.trim();

    // Generate description
    const descriptionResponse = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Write a brief, exciting description for a ${genre} TV show titled "${title}" with ${subgenre} elements, set in a ${storyType} world with a ${personalTouch} touch.`,
      max_tokens: 200
    });
    const description = descriptionResponse.data.choices[0].text.trim();

    // Generate image prompt for DALL-E
    const imagePromptResponse = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Create a detailed prompt for DALL-E to generate a poster image for a ${genre} TV show titled "${title}" with ${subgenre} elements, set in a ${storyType} world with a ${personalTouch} touch.`,
      max_tokens: 100
    });
    const imagePrompt = imagePromptResponse.data.choices[0].text.trim();

    // Generate image using DALL-E
    const imageResponse = await openai.createImage({
      prompt: imagePrompt,
      n: 1,
      size: "256x256",
    });
    const imageUrl = imageResponse.data.data[0].url;

    res.json({ title, description, imageUrl });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while generating the idea' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});