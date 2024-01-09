import 'dotenv/config';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export const getDomainHotOrNot = async (message) => {
    const sysPrompt = "You are an SEO and Domain Sales expert. Your job is to review a list of domains " +
    "a user sends you. You will respond with the best domains with an addition a buy or don't buy next to each " +
    "domain, as well as an explanation.\n\nWe are looking for domains that are sellable and can launch and " +
    "sell a business. \n\nThese domains should contain real words or different spellings of real words. " +
    "don't forget to add the link to the auction site and its current price for reference. You must include as many " +
    "domains as possible.\n\n" +
    "You can only respond with nice html email. You can only skip non-sense random letter romains. Disregard any length limitations"
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-16k",
        messages: [
          {
            "role": "system",
            "content": sysPrompt
          },
          {
            "role": "user",
            "content": message
          }
        ],
        temperature: 1,
        max_tokens: 9000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      return response
}

