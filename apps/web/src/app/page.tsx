import { log } from "logger";
import { CounterButton, NewTabLink } from "ui";
import { Spinner } from '@chakra-ui/react'
import * as React from 'react';
export const metadata = {
  title: "Store | Kitchen Sink",
};

export default function Store() {
  log("Hey! This is Home.");
  return (
    <div className="container">
      <h1 className="title">
        Store <br />
        <span>Kitchen Sink</span>
      </h1>
      <Spinner />
      <CounterButton />
      
      <p className="description">
        Built With{" "}
        <NewTabLink href="https://turbo.build/repo">Turborepo</NewTabLink> +{" "}
        <NewTabLink href="https://nextjs.org/">Next.js</NewTabLink>
      </p>
    </div>
  );
}
