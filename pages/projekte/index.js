import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";

function StatsCard(props) {
  const { title, stat, icon, link } = props;
  return (
    <Link href={link}>
      <Stat
        px={{ base: 2, md: 4 }}
        py={"5"}
        shadow={"xl"}
        border={"1px solid"}
        borderColor={props.bColor}
        borderWidth={3}
        rounded={"lg"}
        role="group"
        _hover={{
          backgroundColor: props.bColor,
          color: "white",
          cursor: "pointer",
        }}
      >
        <Flex justifyContent={"space-between"}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={"medium"} isTruncated>
              {title}
            </StatLabel>
            <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={"auto"}
            color={useColorModeValue("gray.800", "gray.200")}
            alignContent={"center"}
          >
            {icon}
          </Box>
        </Flex>
      </Stat>
    </Link>
  );
}

export default function Projekte() {
  return (
    <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          link={"/"}
          bColor={"#655B8E"}
          title={"Edit Project"}
          icon={
            <Icon as={BsPerson} _groupHover={{ color: "white" }} w={6} h={6} />
          }
        />
        <StatsCard
          link={"/projekte/load"}
          bColor={"#4B7D81"}
          title={"New Project"}
          icon={
            <Icon as={BsPerson} _groupHover={{ color: "white" }} w={6} h={6} />
          }
        />
      </SimpleGrid>
    </Box>
  );
}
