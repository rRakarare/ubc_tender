import Navigation from "../../../components/Project/Navigation";
import prisma from "../../../lib/prisma";
import { useForm, useController } from "react-hook-form";
import {
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useBoolean,
} from "@chakra-ui/react";

export async function getServerSideProps({ params }) {
  const projectId = Number(params.id);

  const project = await prisma.project.findFirst({
    where: { id: projectId },
    include: { client: true },
  });

  return {
    props: { project },
  };
}

export default function Project({ project }) {
  console.log(project);

  const defaultValues = project;

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
    <>
      <Navigation
        path={{ name: "Main", id: project.id }}
        submitter={handleSubmit(submit)}
      />
      <Container
        mt={6}
        as="form"
        bg={"white"}
        p={6}
        onSubmit={handleSubmit(submit)}
      >
        <FormControl pb={4} isInvalid={errors.name}>
          <FormLabel htmlFor="name">Projectname</FormLabel>
          <Input id="name" placeholder="name" {...register("name", {})} />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl pb={4} isInvalid={errors.name}>
          <FormLabel htmlFor="name">Description</FormLabel>
          <Input id="service" placeholder="service" {...register("service", {})} />
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
