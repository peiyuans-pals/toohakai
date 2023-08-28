"use client"
import { log } from "logger";
import { CounterButton, NewTabLink } from "ui";
import * as React from 'react';
import Link from "next/link";
import { Button } from "@chakra-ui/react";

export default function Page() {
  log("Hey! This is Home.");
  return (
    <div className="container">
      <h1 className="title">
        Toohakai <br />
        <span>Demo</span>
       
      </h1>
      <Link href="/Teacher/question_bank"><Button>Teacher Page</Button></Link>
      
    </div>
  );
}
