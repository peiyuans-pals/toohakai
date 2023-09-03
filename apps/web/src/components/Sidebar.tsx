"use client";
import * as React from "react";
import Link from "next/link";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import { IconButton, Button, Stack } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <>
      <IconButton
        ref={btnRef}
        onClick={onOpen}
        aria-label="Open Sidebar"
        size="lg"
        marginLeft={2}
        pos="fixed"
        marginTop={1}
        icon={<HamburgerIcon />}
      />

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Teacher</DrawerHeader>

          <DrawerBody>
            <Stack>
              <Link href="/Teacher/question_bank">
                <Button colorScheme="teal" variant="ghost">
                  Question Bank
                </Button>
              </Link>
              <Link href="/Teacher/quiz">
                <Button colorScheme="teal" variant="ghost">
                  Quiz
                </Button>
              </Link>
              <Link href="/Teacher/quiz_report">
                <Button colorScheme="teal" variant="ghost">
                  Quiz Reports
                </Button>
              </Link>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Link href="/">
              <Button colorScheme="blue">Log Out</Button>
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
