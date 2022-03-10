import prisma from "../../lib/prisma";

import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";

import { FiServer } from "react-icons/fi";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

export async function getStaticProps() {
  const dmmf = { ...prisma._dmmf.datamodelEnumMap };


  console.log(dmmf);

  const models = prisma._dmmf.modelMap;
  const keys = Object.keys(models);

  const data = await Promise.all(
    keys.map(async (item) => {
      const name = item.toLowerCase();

      const countQuery = await prisma[name].aggregate({
        _count: {
          id: true,
        },
      });

      return {
        href: `/admin/${name}`,
        name: name,
        counts: countQuery._count.id,
      };
    })
  );

  console.log(data);

  return {
    props: {
      data: {
        data,
        dmmf,
      },
    },
  };
}

function StatsCards(props) {
  console.log(props.data.dmmf);

  const data = props.data.data;

  const Stats =
    data &&
    data.map((item) => (
      <NextLink passHref href={item.href} key={item.name}>
        <Link>
          <Stat
            px={{ base: 2, md: 4 }}
            py={"5"}
            shadow={"xl"}
            border={"1px solid"}
            borderColor={useColorModeValue("gray.800", "gray.500")}
            rounded={"lg"}
          >
            <Flex justifyContent={"space-between"}>
              <Box pl={{ base: 2, md: 4 }}>
                <StatLabel fontWeight={"medium"} isTruncated>
                  {item.name}
                </StatLabel>
                <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
                  {item.counts}
                </StatNumber>
              </Box>
              <Box
                my={"auto"}
                color={useColorModeValue("gray.800", "gray.200")}
                alignContent={"center"}
              >
                {<FiServer size={"3em"} />}
              </Box>
            </Flex>
          </Stat>
        </Link>
      </NextLink>
    ));

  return <>{Stats}</>;
}

export default function Admin({ data }) {
  return (
    <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={"center"}
        fontSize={"4xl"}
        py={10}
        fontWeight={"bold"}
      >
        Data Models
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCards data={data} />
      </SimpleGrid>
    </Box>
  );
}
