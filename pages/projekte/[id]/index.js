import Navigation from "../../../components/Project/Navigation";
import prisma from "../../../lib/prisma";
import { useForm, useController } from "react-hook-form";
import {
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Text,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import ControlledSelect from "../../../components/Unsorted/ControlledSelect";
import { chakraComponents } from "chakra-react-select";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import _ from "lodash";

export async function getServerSideProps({ params }) {
  const projectId = Number(params.id);

  const project = await prisma.project.findFirst({
    where: { id: projectId },
  });

  const clients = await prisma.client.findMany();

  return {
    props: { project, clients },
  };
}

const customComponents = {
  Option: ({ children, ...props }) => {
    return (
      <chakraComponents.Option {...props}>
        <HStack spacing={4}>
          <Image src={props.data.img} width={20} height={20} />
          <Text>{children}</Text>
        </HStack>
      </chakraComponents.Option>
    );
  },
  SingleValue: ({ children, ...props }) => {
    return (
      <chakraComponents.SingleValue {...props}>
        <HStack spacing={4}>
          <Image src={props.data.img} width={20} height={20} />
          <Text>{children}</Text>
        </HStack>
      </chakraComponents.SingleValue>
    );
  },
};

export default function Project({ project, clients }) {
  const toast = useToast();

  const clientOptions = clients.map((item) => ({
    value: item.id,
    label: item.name,
    img: item.imgUrl,
  }));

  const [defaultValues, setDefaultValues] = useState({
    ...project,
    client: clientOptions.find((client) => client.value === project.clientId),
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });
  const [isLoading, setLoading] = useState(false);

  const submit = async (data) => {
    if (_.isEqual(data, defaultValues)) {
      toast({
        title: "No Changes",
        description: "There are no changes to update",
        status: "info",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    const response = await axios.post("/api/project/update", data);
    if (response.status === 200) {
      setLoading(false);
      setDefaultValues(data);
      toast({
        title: "Project Updated",
        description: "Your Changes got updated",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Navigation
        path={{ name: "Main", id: project.id }}
        submitter={handleSubmit(submit)}
        isLoading={isLoading}
      />
      <Container mt={6} as="form" bg={"white"} p={6}>
        <FormControl pb={4} isInvalid={errors.name}>
          <FormLabel htmlFor="name">Projectname</FormLabel>
          <Input id="name" placeholder="name" {...register("name", {})} />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <ControlledSelect
          control={control}
          id="client"
          name="client"
          label="Client"
          options={clientOptions}
          placeholder="Client"
          rules={{ required: "Bitte wählen" }}
          components={customComponents}
          closeMenuOnSelect={true}
        />
        <FormControl pb={4} isInvalid={errors.name}>
          <FormLabel htmlFor="name">Description</FormLabel>
          <Input
            id="service"
            placeholder="service"
            {...register("service", {})}
          />
          <FormErrorMessage>
            {errors.service && errors.service.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl pb={4} isInvalid={errors.name}>
          <FormLabel htmlFor="name">Ref. Nr.</FormLabel>
          <Input id="ref" placeholder="ref" {...register("ref", {})} />
          <FormErrorMessage>
            {errors.ref && errors.ref.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl pb={4} isInvalid={errors.name}>
          <FormLabel htmlFor="name">Shorthand</FormLabel>
          <Input id="short" placeholder="short" {...register("short", {})} />
          <FormErrorMessage>
            {errors.short && errors.short.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl pb={4} isInvalid={errors.name}>
          <FormLabel htmlFor="name">Year</FormLabel>
          <Input id="year" placeholder="year" {...register("year", {})} />
          <FormErrorMessage>
            {errors.year && errors.year.message}
          </FormErrorMessage>
        </FormControl>
      </Container>
    </>
  );
}
