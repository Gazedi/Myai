import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: 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,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { message } = req.body;
  if (!message) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });
    const reply = completion.data.choices[0].message.content.trim();
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}
