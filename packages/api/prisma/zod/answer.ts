import * as z from "zod"
import * as imports from "../null"
import { CompleteQuestion, RelatedQuestionModel, CompleteQuizResponse, RelatedQuizResponseModel } from "./index"

export const AnswerModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  text: z.string(),
  isCorrect: z.boolean(),
  questionId: z.number().int(),
})

export interface CompleteAnswer extends z.infer<typeof AnswerModel> {
  Question: CompleteQuestion
  QuizResponse: CompleteQuizResponse[]
}

/**
 * RelatedAnswerModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAnswerModel: z.ZodSchema<CompleteAnswer> = z.lazy(() => AnswerModel.extend({
  Question: RelatedQuestionModel,
  QuizResponse: RelatedQuizResponseModel.array(),
}))
