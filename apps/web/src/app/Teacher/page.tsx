"use client";
import { CounterButton } from "ui";
import Sidebar from "../../components/Sidebar";
import * as React from "react";

export default function Page() {
  return (
    <>
      <Sidebar/>
      <div className="container">
      <h1 className="title">
        Default Teacher Page <br />
        <span>Content here</span>
      </h1>
    </div>
    </>
  );
  }
