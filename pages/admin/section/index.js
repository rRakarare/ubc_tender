import MaterialTable from "@material-table/core";
import prisma from "../../../lib/prisma";
import { FiEdit3, FiTrash, FiPlusSquare } from "react-icons/fi";
import Create from "../../../components/AdminCRUD/Create";
import Delete from "../../../components/AdminCRUD/Delete";
import { Button, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

const model = "Section";

export async function getStaticProps() {
  const data = await prisma[model.toLowerCase()].findMany();

  const fields = prisma._dmmf.modelMap[model].fields;

  console.log(fields);

  return {
    props: { data, fields },
  };
}

export default function Section({ data, fields }) {

  const router = useRouter();

  /// Modal for CREATE
  const { isOpen, onOpen, onClose } = useDisclosure();

  /// Modal for DELETE
  const { isOpen:isOpen2, onOpen:onOpen2, onClose:onClose2 } = useDisclosure();
  const [delEntry, setDelEntry] = useState()



  const keys = fields.map((item) => item.name);

  const columns = keys.map((key) => ({
    title: key,
    field: key,
  }));

  return (
    <>
      <MaterialTable
        title={`${model} Data`}
        columns={columns}
        data={data}
        actions={[
          {
            icon: () => <FiPlusSquare />,
            isFreeAction: true,
            onClick: (event) => { /// CREATE
              onOpen()
            },
          },
          {
            icon: () => <FiEdit3 />,

            onClick: (event, rowData) => {
              const rowJson = JSON.stringify(rowData, null, 2);
              alert(`Do save operation : ${rowJson}`);
            },
          },
          {
            icon: () => <FiTrash />,

            onClick: (event, rowData) => { /// DELETE
              setDelEntry(rowData.id)
              onOpen2()
            },
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
      />
      <Create isOpen={isOpen} onOpen={onOpen} onClose={onClose} fields={fields} model={model} router={router}/>
      <Delete isOpen={isOpen2} onOpen={onOpen2} onClose={onClose2} model={model} delEntry={delEntry} router={router}/>
    </>
  );
}
