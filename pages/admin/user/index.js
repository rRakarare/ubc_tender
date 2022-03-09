import MaterialTable from "@material-table/core";
import prisma from "../../../lib/prisma";
import { FiEdit3, FiTrash, FiPlusSquare } from "react-icons/fi";
import Create from "../create";
import { Button, useDisclosure } from "@chakra-ui/react";

const model = "User";

export async function getStaticProps() {
  const data = await prisma[model.toLowerCase()].findMany();

  const fields = prisma._dmmf.modelMap[model].fields;

  console.log(fields);

  return {
    props: { data, fields },
  };
}

export default function User({ data, fields }) {

  const { isOpen, onOpen, onClose } = useDisclosure();

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
            tooltip: "Save User",
            isFreeAction: true,
            onClick: (event) => {
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

            onClick: (event, rowData) => {
              const rowJson = JSON.stringify(rowData, null, 2);
              alert(`Do save operation : ${rowJson}`);
            },
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
      />
      <Create isOpen={isOpen} onOpen={onOpen} onClose={onClose} fields={fields} model={model}/>
    </>
  );
}
