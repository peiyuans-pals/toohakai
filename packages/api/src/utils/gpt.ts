import OpenAI from "openai";
import { z } from "zod";

import { CompletionApi, OpenAIChatApi } from "llm-api";
import { completion } from "zod-gpt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY // defaults to process.env["OPENAI_API_KEY"]
});

export const generateQuestion = async (topic: string) => {
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

export const generateQuestionTyped = async (topic: string, providerName: ChatCompletionProvider) => {
  const openai = new OpenAIChatApi(
    { apiKey: process.env.OPENAI_KEY },
    {
      model: "gpt-3.5-turbo"
    }
  );

  const provider: CompletionApi = providerName === ChatCompletionProvider.openai ? openai : openai // todo: add llama

  const response = await completion(
    provider,
    `
      You are a teacher in a secondary school in singapore.
      You are creating a mock O Level quiz for your students.
      You want to create multiple choice questions for your students to answer.
      There are only 4 options, A, B, C, D. 1 of them is correct.
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
