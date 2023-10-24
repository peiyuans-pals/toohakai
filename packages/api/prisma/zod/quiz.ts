import * as z from "zod"
import * as imports from "../null"
import { QuizStatus } from "@prisma/client"
import { CompleteUser, RelatedUserModel, CompleteQuestionBank, RelatedQuestionBankModel, CompleteQuizParticipant, RelatedQuizParticipantModel } from "./index"

export const QuizModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  title: z.string(),
  status: z.nativeEnum(QuizStatus),
  startTime: z.date().nullish(),
  endTime: z.date().nullish(),
  numOfQuestions: z.number().int(),
  timePerQuestion: z.number().int(),
  authorId: z.string(),
  questionBankId: z.number().int(),
  pinCode: z.string(),
})

export interface CompleteQuiz extends z.infer<typeof QuizModel> {
  author: CompleteUser
  QuestionBank: CompleteQuestionBank
  participants: CompleteQuizParticipant[]
}

/**
 * RelatedQuizModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedQuizModel: z.ZodSchema<CompleteQuiz> = z.lazy(() => QuizModel.extend({
  author: RelatedUserModel,
  QuestionBank: RelatedQuestionBankModel,
  participants: RelatedQuizParticipantModel.array(),
}))
