import { Container, HStack, Tag } from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import prisma from "./../../lib/prisma"

export default function Edit({ data }) {
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
          <Tag size={"sm"} key={tag.id} variant="solid" colorScheme={tag.colorSchema}>
            {tag.name}
          </Tag>
        ));
        return <HStack spacing={4}>{tags}</HStack>;
      },
    },
  ];

  console.log(data);
  return (
    <>
      <Container maxW="container.xl">
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
