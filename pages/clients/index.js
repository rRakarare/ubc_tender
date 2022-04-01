import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import CropperComp from "../../components/Unsorted/Cropper";
import { useToast } from "@chakra-ui/react";

export default function Client() {
  const [imgUrl, setImgUrl] = useState();
  const [croppedImage, setCroppedImage] = useState("/pasteDefault.svg");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setLoading] = useBoolean(false);
  const toast = useToast();

  const paster = (e) => {
    const image = e.clipboardData.files[0];

    if (image == null) {
      toast({
        title: "Wrong File",
        description: "Make sure to paste jpeg or png image",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    // const blob = image.getAsFile()
    const url = URL.createObjectURL(image);
    setImgUrl(url);
    onOpen();
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    setLoading.on();
    setTimeout(() => {
      setLoading.off();
      alert(JSON.stringify({ ...data, img: croppedImage }, null, 2));
    }, 100);
  };

  return (
    <>
      <Container
        onPaste={paster}
        as="form"
        mb={12}
        onSubmit={handleSubmit(submit)}
      >
        <FormControl py={4} isInvalid={errors.name}>
          <FormLabel htmlFor="name">Clientname</FormLabel>
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
        <FormLabel htmlFor="image">Logo</FormLabel>
        <div style={{ cursor: "pointer" }}>
          <Image
            onClick={imgUrl && onOpen}
            src={croppedImage}
            width={150}
            height={150}
            alt={"paste Image"}
          ></Image>
        </div>
        <Button
          mt={4}
          isLoading={isLoading}
          type="submit"
          colorScheme="blackAlpha"
          isFullWidth
        >
          Create
        </Button>
        <CropperComp
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          imgUrl={imgUrl}
          setCroppedImage={setCroppedImage}
        />
      </Container>
    </>
  );
}
