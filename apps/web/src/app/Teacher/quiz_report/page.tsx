"use client";
import { CounterButton } from "ui";
import Sidebar from "../../Components/Sidebar";
import * as React from "react";

export default function Page() {
  return (
    <>
      <Sidebar/>
      <div className="container">
      <h1 className="title">
        Quiz Report Page <br />
        <span>Content here</span>
      </h1>
    </div>
    </>
  );
  }
