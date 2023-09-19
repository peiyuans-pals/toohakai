"use client"
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { ButtonGroup, ButtonGroupItem } from "src/components/ui/ButtonGroup";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { trpc } from "../../../utils/trpc/client";
import { TrpcReactQueryOptions } from "../../../utils/trpc/lib";


export default function Quiz() {
  return (
    <div>
      <p>test</p>
      <div className="flex justify-center">
      <ButtonGroup className=" w-72">
        <ButtonGroupItem value="Test">Test</ButtonGroupItem>
        <ButtonGroupItem value="Test2">Test2</ButtonGroupItem>
        <ButtonGroupItem value="Test3">Test3</ButtonGroupItem>
        <ButtonGroupItem value="Test4">Test4</ButtonGroupItem>
        
        
      </ButtonGroup>
      </div>

    </div>
  );
}
