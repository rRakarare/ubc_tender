import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Create({ isOpen, onClose, fields, model, router }) {
  const [body, setBody] = useState({});

  useEffect(() => {
    console.log(body)
  }, [body])
  

  const createNew = async () => {
    try {
      const res = await axios.post(
        "../api/admin/create",
        {
          model: model,
          data: body,
        },
        { "Content-Type": "application/json" }
      );
      onClose();
      router.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const type = (TYPE) => {
    switch (TYPE) {
      case "Int":
        return "number";
      case "String":
        return "text";
      default:
        return "text";
    }
  };

  const FormBody = fields.map((item) => {

    const name = item.name;

    return (
      <FormControl key={name}>
        <FormLabel>{name}</FormLabel>
        <Input
          type={type(item.type)}
          placeholder={name}
          onChange={(e) =>
            setBody((state) => {
              let newState = { ...state };
              newState[name] = isNaN(Number(e.target.value)) ? e.target.value: Number(e.target.value);
              return newState;
            })
          }
        />
      </FormControl>
    );
  });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create {model}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{FormBody}</ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => createNew()} colorScheme="blue">
              Create new {model}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
