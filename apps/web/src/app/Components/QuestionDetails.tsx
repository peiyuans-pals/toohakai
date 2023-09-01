"use client";
import * as React from "react";
import { Button, Stack, Input, RadioGroup, Radio } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import { FormControl, FormLabel, FormHelperText } from "@chakra-ui/react";

export default function QuestionDetails({
  isOpen,
  onOpen,
  onClose,
  btnRef,
  openMode,
  loadedData,
}) {
  function handleclick() {
    console.log("Unimplemented Yet");
  }
  return (
    <>
      <Drawer
        size="md"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          {openMode == "Edit" && <DrawerHeader>Edit Question</DrawerHeader>}
          {openMode == "New" && (
            <DrawerHeader>Create New Question</DrawerHeader>
          )}

          <DrawerBody>
            <Stack>
              {openMode == "Edit" && (
                <>
                  <FormControl isRequired>
                    <FormLabel>Question</FormLabel>
                    <Input type="text" defaultValue={loadedData.question} />
                    <FormHelperText>
                      Eg: What is the square root of 256?
                    </FormHelperText>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Topic</FormLabel>
                    <Input type="text" defaultValue={loadedData.topic} />
                    <FormHelperText>Eg: Discrete Mathematics</FormHelperText>
                  </FormControl>
                  <FormControl isRequired marginTop={12}>
                    <FormLabel>Option 1</FormLabel>
                    <Input type="text" defaultValue={loadedData.option1} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Option 2</FormLabel>
                    <Input type="text" defaultValue={loadedData.option2} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Option 3</FormLabel>
                    <Input type="text" defaultValue={loadedData.option3} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Option 4</FormLabel>
                    <Input type="text" defaultValue={loadedData.option4} />
                  </FormControl>
                  <RadioGroup defaultValue={loadedData.correct}>
                    <FormLabel marginTop={5}>Correct Option</FormLabel>
                    <Stack spacing={4} direction="row">
                      <Radio value="1">Option 1</Radio>
                      <Radio value="2">Option 2</Radio>
                      <Radio value="3">Option 3</Radio>
                      <Radio value="4">Option 4</Radio>
                    </Stack>
                  </RadioGroup>
                </>
              )}

              {openMode == "New" && (
                <>
                  <FormControl isRequired>
                    <FormLabel>Question</FormLabel>
                    <Input type="text" />
                    <FormHelperText>
                      Eg: What is the square root of 256?
                    </FormHelperText>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Topic</FormLabel>
                    <Input type="text" />
                    <FormHelperText>Eg: Discrete Mathematics</FormHelperText>
                  </FormControl>
                  <FormControl isRequired marginTop={12}>
                    <FormLabel>Option 1</FormLabel>
                    <Input type="text" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Option 2</FormLabel>
                    <Input type="text" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Option 3</FormLabel>
                    <Input type="text" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Option 4</FormLabel>
                    <Input type="text" />
                  </FormControl>
                  <RadioGroup defaultValue="1">
                    <FormLabel marginTop={5}>Correct Option</FormLabel>
                    <Stack spacing={4} direction="row">
                      <Radio value="1">Option 1</Radio>
                      <Radio value="2">Option 2</Radio>
                      <Radio value="3">Option 3</Radio>
                      <Radio value="4">Option 4</Radio>
                    </Stack>
                  </RadioGroup>
                </>
              )}
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            {openMode == "Edit" && (
              <Button colorScheme="blue" onClick={handleclick}>
                Edit Question
              </Button>
            )}
            {openMode == "New" && (
              <Button colorScheme="blue" onClick={handleclick}>
                Create New Question
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
