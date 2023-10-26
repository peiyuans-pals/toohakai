"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Page } from "../../../components/ui";
import { NextPage } from "../../../types/next";
import { undefined } from "zod";
import { trpc } from "../../../utils/trpc/client";
import { useRouter } from "next/navigation";

export default function JoinQuiz({ searchParams }: NextPage) {
  const [roomNumber, setRoomNumber] = useState<number | undefined>(
    parseInt(searchParams.room_id as string) ?? undefined
  );
  const [pin, setPin] = useState<number | undefined>(
    parseInt(searchParams.pin as string) ?? undefined
  );

  const router = useRouter();

  const mutation = trpc.quizSession.join.useMutation({
    onSuccess: (data) => {
      router.push(`/student/quiz/${roomNumber}`); // ? should we get the quiz id from the response?
    }
  });

  const handleClick = () => {
    console.log("handleClick", `roomNumber: ${roomNumber}, pin: ${pin}`);
    if (!roomNumber || !pin) {
      return;
    }
    // todo
    // validate with server, then redirect to /student/quiz
    mutation.mutate({
      quizId: roomNumber,
      pinCode: pin.toString().padStart(6, "0")
    });
  };

  return (
    <Page className="flex-col flex justify-center items-center gap-4">
      <p className="font-extrabold text-2xl text-primary">toohakai</p>
      <p>join quiz</p>
      <Input
        type="number"
        placeholder="Room ID"
        className="w-80"
        value={roomNumber}
        onChange={(e) => setRoomNumber(parseInt(e.target.value))}
      />
      <Input
        type="number"
        placeholder="Pin code"
        className="w-80"
        value={pin}
        onChange={(e) => setPin(parseInt(e.target.value))}
      />
      <Button variant={"destructive"} onClick={handleClick}>
        Submit
      </Button>
    </Page>
  );
}
