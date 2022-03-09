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
import { useState } from "react";

export default function Create({ isOpen, onClose, fields, model }) {
  const [body, setBody] = useState({});

  const createNew = async () => {
    const res = await axios.post(
      "../api/admin/create",
      {
        model: model,
        data: body,
      },
      { "Content-Type": "application/json" }
    );
    console.log(res.data);
  };

  const FormBody = fields.map((item) => {

    const name = item.name

    return (
      <FormControl key={name}>
        <FormLabel>{name}</FormLabel>
        <Input placeholder={name} onChange={e=> setBody(state => {
          let newState = {...state}
          newState[name] = e.target.value
          return newState
        })}/>
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
