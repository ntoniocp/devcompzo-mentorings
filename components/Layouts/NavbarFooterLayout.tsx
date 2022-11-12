import { createContext } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import EditProfileDrawerLayout from "./EditProfileDrawerLayout";

interface Props {
  children: React.ReactNode;
}

export default function NavbarFooterLayout({ children }: Props) {
  return (
    <EditProfileDrawerLayout>
      <Flex
        px="8%"
        pt={4}
        flexDirection="column"
        justifyContent="space-between"
        height="100vh"
      >
        <Navbar />
        <Box flexGrow={1}>{children}</Box>
        <Footer />
      </Flex>
    </EditProfileDrawerLayout>
  );
}
