import MaterialTable from "@material-table/core";
import prisma from "../../../lib/prisma";
import { FiEdit3, FiTrash, FiPlusSquare } from "react-icons/fi";
import Create from "../../../components/AdminCRUD/Create";
import Delete from "../../../components/AdminCRUD/Delete";
import { Button, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

const model = "Content";

export async function getStaticProps() {
  const data = await prisma[model.toLowerCase()].findMany();

  const fieldsraw = prisma._dmmf.modelMap[model].fields;


  /// Filter relational fields out
  const fields = fieldsraw.filter((item) => item.kind != "object")


  /// Create Object with additional Querys (ids -> data)
  let idConverts = {};

  fieldsraw.forEach((field, i) => {
    if (field.relationFromFields) {
      idConverts[field.relationFromFields] = field.type;
    }
  });

  /// Query Additional Data for Selectfields

  const iterateThrough = Object.keys(idConverts)

  const relatedData = await Promise.all(
    iterateThrough.map(async (item) => {
      const name = idConverts[item].toLowerCase();
      const data = await prisma[name].findMany();
      return {name:item, model:idConverts[item], items:data}
    }))


  return {
    props: { data, fields, relatedData },
  };
}

export default function Content({ data, fields, relatedData }) {


  const relatedNames = relatedData.map(item=> item.name)


  const newData = data.map(item => {
    const names = Object.keys(item);

    let newObj = {}

    names.forEach(name => {
      if (relatedNames.includes(name)) {
        newObj[name] = relatedData.find(reldat => reldat.name == name).items.find(entry => entry.id == item[name]).name
      }
    })

    return {...item, ...newObj}

  })


  const router = useRouter();

  /// Modal for CREATE
  const { isOpen, onOpen, onClose } = useDisclosure();

  /// Modal for DELETE
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const [delEntry, setDelEntry] = useState();

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
        data={newData}
        actions={[
          {
            icon: () => <FiPlusSquare />,
            isFreeAction: true,
            onClick: (event) => {
              /// CREATE
              onOpen();
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
              /// DELETE
              setDelEntry(rowData.id);
              onOpen2();
            },
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
      />
      <Create
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        fields={fields}
        model={model}
        router={router}
      />
      <Delete
        isOpen={isOpen2}
        onOpen={onOpen2}
        onClose={onClose2}
        model={model}
        delEntry={delEntry}
        router={router}
      />
    </>
  );
}
