import { Button, Container, HStack, Tag, Box, Icon } from "@chakra-ui/react";
import { FaTrash, FaCog, FaPlus } from "react-icons/fa";
import Link from "next/link";
import DataTable from "react-data-table-component";
import prisma from "../../lib/prisma";
import axios from "axios";
import { useRouter } from "next/router";

export default function Edit({ data }) {

  const router = useRouter()

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Typ",
      selector: (row) => row.projectType.name,
      sortable: true,
    },
    {
      name: "Tags",
      selector: (row) => row.tags,
      cell: (e) => {
        const tags = e.tags.map((tag) => (
          <Tag
            size={"sm"}
            key={tag.id}
            variant="solid"
            colorScheme={tag.colorSchema}
          >
            {tag.name}
          </Tag>
        ));
        return <HStack spacing={4}>{tags}</HStack>;
      },
    },
    {
      name: "Open",
      width: "90px",
      selector: (row) => row.id,
      center: true,
      cell: (e) => {
        return <Icon onClick={()=>router.push(`/projekte/${e.id}`)} p={2} h={7} w={7} cursor={"pointer"} as={FaCog}/>;
      },
    },
    {
      name: "Delete",
      width: "90px",
      selector: (row) => row.id,
      center: true,
      cell: (e) => {
        const del = async (id) => {
          await axios.post('/api/project/delete',{id:id})
          router.replace(router.asPath);
        }
        return <Icon onClick={()=> del(e.id)} p={2} h={7} w={7} cursor={"pointer"} as={FaTrash}/>;
      },
    },
  ];

  console.log(data);
  return (
    <>
      <Container maxW="container.xl">
        <Link href="/projekte/create">
          <Button my={4} size={"sm"} bg="white" colorScheme={"gray"}>
            <Box mr={2}>Create Project</Box> <FaPlus />
          </Button>
        </Link>
        <DataTable columns={columns} data={data} />
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const query = await prisma.project.findMany({
    include: {
      projectType: true,
      TagsOnProjects: {
        include: {
          tag: true,
        },
      },
    },
  });

  const data = query.map((item) => {
    return {
      id: item.id,
      name: item.name,
      projectType: item.projectType,
      tags: item.TagsOnProjects.map((entry) => entry.tag),
    };
  });

  return {
    props: {
      data: data,
    },
  };
}
