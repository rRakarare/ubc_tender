import {
  Badge,
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Input,
  Stack,
  Tag,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { Select, chakraComponents } from "chakra-react-select";
import { useForm, useController } from "react-hook-form";
import ControlledSelect from "../../components/Unsorted/ControlledSelect";

import prisma from "../../lib/prisma";

const customComponents = {
  Option: ({ children, ...props }) => {
    return (
      <chakraComponents.Option {...props}>
        <HStack spacing={4}>
          <Text>{children}</Text>
          {props.data.tags.map((tag) => (
            <Tag
              size={"sm"}
              key={tag.name}
              variant="solid"
              colorScheme={tag.colorSchema}
            >
              {tag.name}
            </Tag>
          ))}
        </HStack>
      </chakraComponents.Option>
    );
  },
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

export default function Load({ data }) {
  const dataOptions = data.map((item) => ({
    value: item.id,
    label: item.name,
    tags: item.tags,
  }));

  const defaultValues = { projects: [], name: "" };

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });
  const [isLoading, setLoading] = useBoolean(false);

  const submit = async (data) => {
    setLoading.on();
    setTimeout(() => {
      setLoading.off();
      alert(JSON.stringify(data, null, 2));
      console.log(data);
    }, 1);
  };

  return (
    <Container as="form" mb={12} onSubmit={handleSubmit(submit)}>
      <ControlledSelect
        control={control}
        isMulti
        id="projects"
        name="projects"
        options={dataOptions}
        placeholder="Select Projects to merge"
        label="Projects"
        rules={{ required: "Please enter at least one food group." }}
        components={customComponents}
        closeMenuOnSelect={false}
      />
      <FormControl py={4} isInvalid={errors.name}>
        <FormLabel htmlFor="name">Projectname</FormLabel>
        <Input
          id="name"
          placeholder="name"
          {...register("name", {
            required: "This is required",
            minLength: { value: 4, message: "Minimum length should be 4" },
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>

      <HStack py={4} spacing={4}>
        <Button
          isLoading={isLoading}
          type="button"
          colorScheme="blue"
          isFullWidth
          onClick={() => reset(defaultValues)}
        >
          Reset
        </Button>

        <Button
          isLoading={isLoading}
          type="submit"
          colorScheme="green"
          isFullWidth
        >
          Submit
        </Button>
      </HStack>
    </Container>
  );
}
