"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Page } from "../../../components/ui";

interface Props {
  pin: bigint;
}

export default function JoinQuizRoom() {
  const [pin, setPin] = useState(0);
  return (
    <Page className="flex-col flex justify-center items-center gap-4">
      <p className="font-extrabold text-2xl text-primary">toohakai</p>
      <Input
        type="number"
        placeholder="Pin code"
        className="w-80"
        onChange={(e) => setPin(parseInt(e.target.value))}
      />
      <Button variant={"destructive"}>Submit</Button>
    </Page>
  );
}

function sendPinToServer({ pin }: Props) {
  //TODO: send pin to server
}
