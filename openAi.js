import 'dotenv/config';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const getDomainHotOrNot = async (message) => {
    const characters = ['.', '..', '...', '....', '...', '..'];
    console.log('Informing ' + process.env.GPT_MODEL + ' of domains on auction in the next 24 hours.')
    
    // Set loading to true initially
    let loading = true;
    
    // Start loading animation
    const loadingInterval = setInterval(async () => {
        for (const char of characters) {
            process.stdout.write("Reviewing domains " + char + " \r");
            await sleep(200);
        }
    }, 1000); // Adjust the interval if needed
    const sysPrompt = "You are a SEO and Domain Sales expert. Your job is to review a list of domains " +
    "a user sends you. You will respond with the best domains, a buy or don't buy next to each domain, " +
    "as well as a tweet like explanation.\n\nWe are looking for domains that are sellable and can launch and " +
    "sell a business. \n\nThese domains should contain real words or different spellings of real words. " +
    "don't forget to add the auction url and its current price for reference. You must include as many " +
    "domains as possible.\n\n" +
    "You can only respond in CSV with escaped commas in the text. You can only skip non-sense random letter romains. Disregard any length limitations\n\n" +
    "You must use the following as the first column: Name, Auction URL, Current Bid, Buy/Don't Buy, Explination"
    const response = await openai.chat.completions.create({
        model: process.env.GPT_MODEL,
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