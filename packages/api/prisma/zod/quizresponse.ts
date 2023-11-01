import * as z from "zod"
import * as imports from "../null"
import { CompleteQuiz, RelatedQuizModel, CompleteUser, RelatedUserModel, CompleteQuestion, RelatedQuestionModel, CompleteAnswer, RelatedAnswerModel } from "./index"

export const QuizResponseModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  quizId: z.number().int(),
  userId: z.string(),
  questionId: z.number().int(),
  answerId: z.number().int(),
})

export interface CompleteQuizResponse extends z.infer<typeof QuizResponseModel> {
  Quiz: CompleteQuiz
  User: CompleteUser
  question: CompleteQuestion
  answer: CompleteAnswer
}

/**
 * RelatedQuizResponseModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedQuizResponseModel: z.ZodSchema<CompleteQuizResponse> = z.lazy(() => QuizResponseModel.extend({
  Quiz: RelatedQuizModel,
  User: RelatedUserModel,
  question: RelatedQuestionModel,
  answer: RelatedAnswerModel,
}))
