import * as React from "react";
import {Box, Flex} from "@chakra-ui/react";

export default function Page() {
    return(
        <>
            <Box>
                <Flex
                    flexDirection = "column"
                    paddingTop={100}
                    paddingLeft={75}
                    paddingRight={75}
                >
                    <h1 className="title">Expanded Quiz Report Page</h1>
                </Flex>
            </Box>
        </>
    );
}