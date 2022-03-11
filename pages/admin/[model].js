import MaterialTable from "@material-table/core";
import prisma from "../../lib/prisma";
import { FiEdit3, FiTrash, FiPlusSquare } from "react-icons/fi";
import Create from "../../components/AdminCRUD/Create";
import Delete from "../../components/AdminCRUD/Delete";
import { Button, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

export async function getServerSideProps({ params }) {
  const model = params.model.toString();

  const data = await prisma[model].findMany();

  const enums = prisma._dmmf.datamodelEnumMap;

  const fieldsraw = prisma._dmmf.modelMap[capitalize(model)].fields;

  /// Filter relational fields out
  const fields = fieldsraw.filter((item) => item.kind != "object");

  /// Create Object with additional Querys (ids -> data)
  let idConverts = {};

  fieldsraw.forEach((field, i) => {
    if (field.relationFromFields) {
      idConverts[field.relationFromFields] = field.type;
    }
  });

  /// Query Additional Data for Selectfields

  const iterateThrough = Object.keys(idConverts);

  const relatedData = await Promise.all(
    iterateThrough.map(async (item) => {
      const name = idConverts[item].toLowerCase();
      const data = await prisma[name].findMany();
      return { name: item, model: idConverts[item], items: data };
    })
  );

  return {
    props: { data, fields, relatedData, model, enums },
  };
}

export default function Content({ data, fields, relatedData, model, enums }) {
  const relatedNames = relatedData.map((item) => item.name);

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

  const columns = keys.map((key) => {
    if (relatedNames.includes(key)) {
      const relatedObjectArray = relatedData.find(
        (item) => item.name == key
      ).items;

      return {
        title: key,
        field: key,
        render: (rowData) =>
          relatedObjectArray.find((obj) => obj.id == rowData[key]).name,
      };
    } else {
      return {
        title: key,
        field: key,
      };
    }
  });

  console.log("relatedData", relatedData);
  console.log("relatedNames", relatedNames);
  console.log("columns", columns);
  console.log("data", data);

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
        relatedData={relatedData}
        enums={enums}
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
