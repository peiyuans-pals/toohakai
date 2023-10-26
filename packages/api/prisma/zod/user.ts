import * as z from "zod"
import * as imports from "../null"
import { UserRole } from "@prisma/client"
import { CompleteQuestionBank, RelatedQuestionBankModel, CompleteQuiz, RelatedQuizModel, CompleteQuizParticipant, RelatedQuizParticipantModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  firstLoginAt: z.date(),
  lastLoginAt: z.date(),
  role: z.nativeEnum(UserRole),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  QuestionBank: CompleteQuestionBank[]
  Quiz: CompleteQuiz[]
  QuizParticipant: CompleteQuizParticipant[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  QuestionBank: RelatedQuestionBankModel.array(),
  Quiz: RelatedQuizModel.array(),
  QuizParticipant: RelatedQuizParticipantModel.array(),
}))
