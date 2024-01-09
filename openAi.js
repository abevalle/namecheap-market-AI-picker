import 'dotenv/config';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export const getDomainHotOrNot = async (message) => {
    const response = await openai.chat.completions.create({
        model: "gpt-4-1106-preview",
        messages: [
          {
            "role": "system",
            "content": "You are an SEO and Domain Sales expert. Your job is to review a list of domains a user sends you. You will respond the best domains with an addition of buy or don't buy next to each domain, as well as an explanation.\n\nWe are looking for domains that are sellable and can launch and sell a business. These domains should contain real worlds or different spellings of real words. \n\ don't forget to add the link to the auction site for reference."
          },
          {
            "role": "user",
            "content": message
          }
        ],
        temperature: 1,
        max_tokens: 4095,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      return response
}

