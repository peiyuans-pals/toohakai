/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from "../../../../../../../packages/api/src/utils/trpc";

import * as React from "react";
import { z } from "zod";
import { prisma } from "../../../../../../../packages/api/src/utils/prisma";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { NewQuestionBankButton } from "./../../../../../src/app/dashboard/teacher/question-banks/_components/NewQuestionBankButton";
import { trpc } from "../../../../../src/utils/trpc/client";

jest.mock("../../../../../src/utils/trpc/client", () => {
  return {
    trpc: {
      useContext: () => ({
        questionBank: {
          create: protectedProcedure
            .meta({
              description: "Create a questionBank!"
            })
            .input(
              z.object({
                title: z.string().min(4).max(32)
              })
            )
            .mutation(async (opts) => {
              console.log("trying to create a questionBank");

              const questionBank = await prisma.questionBank.create({
                data: {
                  title: opts.input.title,
                  // authorId: opts.ctx.user.data.user!.id,
                  author: {
                    connect: {
                      id: opts.ctx.user.data.user!.id
                    }
                  }
                },
                include: {
                  author: true
                }
              });

              return {
                success: true,
                status: "questionBank created successfully",
                questionBank
              };
            })
        }
      })
    }
  };
});

describe("NewQuestionBankButton", () => {
  it("renders the button and opens the dialog on click", async () => {
    render(<NewQuestionBankButton />);

    // Check if the button is rendered
    const button = screen.getByText("Create New Question Bank");
    expect(button).toBeInTheDocument();
  });
});
