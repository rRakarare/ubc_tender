import { Button, Menu, MenuButton, MenuList, MenuItem  } from "@chakra-ui/react";
import { ChevronDownIcon  } from "@chakra-ui/icons";

export default function Navigation() {
  return (
    <Menu>
      <MenuButton bg={"white"}  as={Button}>
      Navigation <ChevronDownIcon />
      </MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
      </MenuList>
    </Menu>
  );
}
