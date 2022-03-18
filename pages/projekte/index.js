import { Badge, Box, HStack, Icon, Stack, Tag, Text } from "@chakra-ui/react";
import { Select, chakraComponents } from "chakra-react-select";

import prisma from "../../lib/prisma";

const customComponents = {
  Option: ({ children, ...props }) => {

      return (
        <chakraComponents.Option {...props}>
          <HStack spacing={4}>
            <Text>{children}</Text>
            {props.data.tags.map((tag) => (
              <Tag size={"sm"} key={tag.name} variant="solid" colorScheme={tag.colorSchema}>
                {tag.name}
              </Tag>
            ))}
          </HStack>
        </chakraComponents.Option>
      )
  }
};

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

export default function Projekte({ data }) {



  const dataOptions = data.map(item => ({
      value: item.id,
      label: item.name,
      tags: item.tags
  }))

  console.log(dataOptions);

  return (
    <Select
      name="flavors"
      options={dataOptions}
      placeholder="Select some flavors..."
      components={customComponents}
    />
  );
}
