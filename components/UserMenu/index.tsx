import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { getAvatarPlaceHolder } from "../../utils/avatar";
import { useEditProfileDrawer } from "../Layouts/EditProfileDrawerLayout";

interface Props {
  userData: {
    name: string;
    image?: string;
  };
  onSignOut?: () => void;
}

export default function UserMenu({ userData, onSignOut = () => null }: Props) {
  const { toggle: toggleEditUserDrawer } = useEditProfileDrawer();

  const menuItemsActiveStyles = {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar
          size={"sm"}
          src={userData.image || getAvatarPlaceHolder(userData.name)}
        />
      </MenuButton>
      <MenuList
        background="#25282f"
        border="1px solid #3c3c3c"
        color="white"
        rounded="lg"
      >
        <MenuItem
          onClick={toggleEditUserDrawer}
          _hover={menuItemsActiveStyles}
          _active={menuItemsActiveStyles}
          _focus={menuItemsActiveStyles}
        >
          Editar perfil
        </MenuItem>
        <MenuDivider />
        <MenuItem
          onClick={() => onSignOut()}
          _active={menuItemsActiveStyles}
          _hover={menuItemsActiveStyles}
          _focus={menuItemsActiveStyles}
        >
          Cerrar sesión
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
