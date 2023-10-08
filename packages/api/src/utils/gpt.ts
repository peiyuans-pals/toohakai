import OpenAI from "openai";
import { z } from "zod";

import { CompletionApi, OpenAIChatApi } from "llm-api";
import { completion } from "zod-gpt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY // defaults to process.env["OPENAI_API_KEY"]
});

export const generateQuestionOpenai = async (topic: string) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
      You are a teacher in a secondary school in singapore.
      You are creating a mock O Level quiz for your students.
      You want to create multiple choice questions for your students to answer.
      There are only 4 answer options. Only 1 of them is correct.
      Keep the scope of the question to the topic of "${topic} in Singapore O Levels.
      Give a reason as to why the option is correct.
      Respond only in json format.
      `
      }
    ],
    model: "gpt-3.5-turbo"
  });
  return completion?.choices[0]?.message?.content ?? null;
};

export enum ChatCompletionProvider {
  openai = "openai",
  ollama = "ollama"
}

export const generateQuestionZodGpt = async (
  topic: string,
  _providerName: ChatCompletionProvider
) => {
  const openai = new OpenAIChatApi(
    {
      apiKey: process.env.OPENAI_KEY
      // ...(providerName === ChatCompletionProvider.ollama ? { basePath: "http://localhost:5033" } : {})
      // pretending llmproxy is a self-hosted azure function
      // azureDeployment: "ollama",
      // azureEndpoint: "http://127.0.0.1:5044",
    },
    {
      model: "gpt-3.5-turbo"
    }
  );

  console.log("isAzure:" + openai._isAzure);

  console.log("client", openai._client);

  const response = await completion(
    openai,
    `
      You are a teacher in a secondary school in singapore.
      You are creating a mock O Level quiz for your students.
      You want to create multiple choice questions for your students to answer.
      There are only 4 options, A, B, C, D. Only 1 of them is correct.
      Keep the scope of the question to the topic of "${topic} in Singapore O Levels.
      Give a reason as to why the option is correct.
      `,
    {
      schema: z.object({
        questionTitle: z.string().describe("question title"),
        answers: z
          .array(
            z.object({
              text: z.string().min(1).max(32).describe("answer text"),
              isCorrect: z.boolean().describe("is this answer correct?")
            })
          )
          .length(4)
          .describe("4 possible answers"),
        reason: z.string().describe("Why the correct answer is correct")
      })
    }
  );

  // data will be typed as { name: string; description: string }
  console.log(response.data);

  return response.data;
};
