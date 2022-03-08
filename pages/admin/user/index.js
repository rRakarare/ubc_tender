import MaterialTable from "@material-table/core";
import prisma from "../../../lib/prisma";

import { FiEdit3, FiTrash } from "react-icons/fi";

const model = "User";

export async function getStaticProps() {
  const data = await prisma[model.toLowerCase()].findMany();

  const fields = prisma._dmmf.modelMap[model].fields;

  return {
    props: { data, fields },
  };
}

export default function User({ data, fields }) {
  const keys = fields.map((item) => item.name);

  const columns = keys.map((key) => ({
    title: key,
    field: key,
  }));

  return (
    <MaterialTable
      title={`${model} Data`}
      columns={columns}
      data={data}
      actions={[
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
  );
}
