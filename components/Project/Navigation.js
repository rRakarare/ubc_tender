import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { HamburgerIcon, Icon } from "@chakra-ui/icons";
import Link from "next/link";
import { FaRegSave } from "react-icons/fa";

const navs = [
  { name: "Main", href: "/" },
  { name: "Contents", href: "/content" },
];

export default function Navigation({ path, submitter }) {
  const Navs = navs.map((item) => {
    return (
      <Link key={item.href} href={`/projekte/${path.id}${item.href}`}>
        <MenuItem>{item.name}</MenuItem>
      </Link>
    );
  });

  return (
    <HStack justify={"space-between"}>
      <Menu>
        <HStack spacing={4}>
          <MenuButton bg={"white"} as={Button}>
            <HamburgerIcon />
          </MenuButton>
          <Text>{path.name}</Text>
        </HStack>
        <MenuList>{Navs}</MenuList>
      </Menu>
      <Icon onClick={()=>submitter()} cursor={"pointer"} w={8} h={8}  as={FaRegSave}/>
    </HStack>
  );
}
