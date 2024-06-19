const { PerplexityClient } = require('@perplexity/client');

const perplexityClient = new PerplexityClient({
  apiKey: process.env.PERPLEXITY_API_KEY,
});


app.post('/api/generate', async (req, res) => {
    const { prompt, type } = req.body;
    console.log(`Received prompt: ${prompt}, type: ${type}`);
  
    try {
      const response = await perplexityClient.createCompletion({
        model: 'gpt-4', // or any other Perplexity model you want to use
        prompt: `You are a helpful assistant specialized in generating ${type}. ${prompt}`,
        maxTokens: 1500,
        temperature: 0.7,
      });
  
      console.log('Perplexity API response:', response);
      res.json(response);
    } catch (error) {
      console.error('Error with Perplexity API request:', error);
      res.status(500).json({ error: 'An error occurred while generating content' });
    }
  });