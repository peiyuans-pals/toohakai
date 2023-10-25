import * as z from "zod";
import * as imports from "../null";
import { QuizParticipantConnectionStatus } from "@prisma/client";
import {
  CompleteQuiz,
  RelatedQuizModel,
  CompleteUser,
  RelatedUserModel
} from "./index";

export const QuizParticipantModel = z.object({
  joinedAt: z.date(),
  connectionStatus: z.nativeEnum(QuizParticipantConnectionStatus),
  quizId: z.number().int(),
  userId: z.string()
});

export interface CompleteQuizParticipant
  extends z.infer<typeof QuizParticipantModel> {
  Quiz: CompleteQuiz;
  User: CompleteUser;
}

/**
 * RelatedQuizParticipantModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedQuizParticipantModel: z.ZodSchema<CompleteQuizParticipant> =
  z.lazy(() =>
    QuizParticipantModel.extend({
      Quiz: RelatedQuizModel,
      User: RelatedUserModel
    })
  );
