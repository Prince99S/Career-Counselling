import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "carer1", // Unique app ID
  name: "Career1",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});
