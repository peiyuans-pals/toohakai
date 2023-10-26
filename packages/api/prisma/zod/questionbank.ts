import * as z from "zod"
import * as imports from "../null"
import { CompleteUser, RelatedUserModel, CompleteQuestion, RelatedQuestionModel, CompleteQuiz, RelatedQuizModel } from "./index"

export const QuestionBankModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  title: z.string(),
  authorId: z.string(),
})

export interface CompleteQuestionBank extends z.infer<typeof QuestionBankModel> {
  author: CompleteUser
  questions: CompleteQuestion[]
  Quiz: CompleteQuiz[]
}

/**
 * RelatedQuestionBankModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedQuestionBankModel: z.ZodSchema<CompleteQuestionBank> = z.lazy(() => QuestionBankModel.extend({
  author: RelatedUserModel,
  questions: RelatedQuestionModel.array(),
  Quiz: RelatedQuizModel.array(),
}))
