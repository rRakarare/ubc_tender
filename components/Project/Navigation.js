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
import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";

const navs = [
  { name: "Main", href: "/" },
  { name: "Contents", href: "/content" },
];

export default function Navigation({ path }) {
  const Navs = navs.map((item) => {
    return (
      <Link key={item.href} href={`/projekte/${path.id}${item.href}`}>
        <MenuItem>{item.name}</MenuItem>
      </Link>
    );
  });

  return (
    <Menu>
      <HStack spacing={4}>
        <MenuButton bg={"white"} as={Button}>
          <HamburgerIcon />
        </MenuButton>
        <Text>{path.name}</Text>
      </HStack>
      <MenuList>{Navs}</MenuList>
    </Menu>
  );
}
