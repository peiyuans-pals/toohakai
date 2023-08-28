"use client"
import { log } from "logger";
import { CounterButton, NewTabLink } from "ui";
import * as React from 'react';
import { Spinner } from "@chakra-ui/react";

export default function Store() {
  log("Hey! This is Home.");
  return (
    <div className="container">
      <h1 className="title">
        Store <br />
        <span>Kitchen Sink</span>
      </h1>
      <Spinner/>
      <CounterButton />
    </div>
  );
}
