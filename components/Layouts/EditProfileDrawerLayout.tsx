import { useDisclosure } from "@chakra-ui/react";
import { createContext, ReactNode, useContext } from "react";
import EditProfileDrawer from "../EditProfileDrawer";

interface DrawerContextValues {
  isOpen: boolean;
  toggle: () => void;
}

const DrawerContext = createContext<DrawerContextValues>({
  isOpen: false,
  toggle: () => null,
});

interface EditProfileDrawerLayoutProps {
  children?: ReactNode;
}

export default function EditProfileDrawerLayout({
  children,
}: EditProfileDrawerLayoutProps) {
  const { isOpen, onToggle: toggle } = useDisclosure();

  return (
    <DrawerContext.Provider
      value={{
        isOpen,
        toggle,
      }}
    >
      {children}
      <EditProfileDrawer isOpen={isOpen} onCloseClick={toggle} />
    </DrawerContext.Provider>
  );
}

export function useEditProfileDrawer() {
  return useContext(DrawerContext);
}
