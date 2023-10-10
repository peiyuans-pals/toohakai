import * as z from "zod";
import * as imports from "../null";
import {
  CompleteAnswer,
  RelatedAnswerModel,
  CompleteQuestionBank,
  RelatedQuestionBankModel
} from "./index";

export const QuestionModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  title: z.string(),
  questionBankId: z.number().int()
});

export interface CompleteQuestion extends z.infer<typeof QuestionModel> {
  answers: CompleteAnswer[];
  QuestionBank: CompleteQuestionBank;
}

/**
 * RelatedQuestionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedQuestionModel: z.ZodSchema<CompleteQuestion> = z.lazy(() =>
  QuestionModel.extend({
    answers: RelatedAnswerModel.array(),
    QuestionBank: RelatedQuestionBankModel
  })
);
