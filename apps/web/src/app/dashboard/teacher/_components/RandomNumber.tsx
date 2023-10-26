"use client";
import { useState } from "react";
import { trpc } from "../../../../utils/trpc/client";

const RandomNumber = () => {
  const [randomNum, setRandomNum] = useState<number>(0);
  trpc.quizSession.randomNumber.useSubscription(undefined, {
    onData: (data) => {
      setRandomNum(data.randomNumber);
    }
  });

  return <div>random number: {randomNum}</div>;
};

export default RandomNumber;
