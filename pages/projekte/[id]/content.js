import Navigation from "../../../components/Project/Navigation";
import prisma from "../../../lib/prisma";
import DataTable from "react-data-table-component";
import { Button, Container, HStack, Icon } from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";
import { FaTrash, FaCog, FaPlus } from "react-icons/fa";
import { useControls } from "leva";

export async function getServerSideProps({ params }) {
  const projectId = Number(params.id);

  const project = await prisma.project.findFirst({
    where: { id: projectId },
    include: {
      contents: {
        include: {
          content: {
            include: {
              section: {
                include: {
                  parentSection: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return {
    props: { project },
  };
}

export default function Project({ project }) {
  const data = project.contents.map((item) => item.content);

  console.log(data);

  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const { myValue } = useControls({
    select: {options: ["xwqeewq", "yasdsda","zasddsa"], label:"options"},
    string: {value:"hello", rows:1,label:"test"},
    
  });

  const handleRowSelected = useCallback((state) => {
    console.log(state);
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = useMemo(() => {
    return (
      <HStack>
        <Icon
          onClick={() => ""}
          p={2}
          h={7}
          w={7}
          cursor={"pointer"}
          as={FaCog}
        />
        <Icon
          onClick={() => ""}
          p={2}
          h={7}
          w={7}
          cursor={"pointer"}
          as={FaTrash}
        />
      </HStack>
    );
  }, [data, selectedRows, toggleCleared]);

  const columns = [
    {
      name: "Section",
      selector: (row) => row.section.name,
      sortable: true,
    },
    {
      name: "Parent",
      selector: (row) =>
        row.section.parentSection && row.section.parentSection.name,
      sortable: true,
    },
    {
      name: "Text",
      selector: (row) => row.textShort,
      sortable: true,
    },
  ];

  return (
    <>
      <Navigation path={{ name: "Content", id: project.id }} />
      <Container pt={6} maxW="container.xl">
        <DataTable
          title="Contents"
          selectableRows
          contextActions={contextActions}
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggleCleared}
          columns={columns}
          data={data}
        />
      </Container>
    </>
  );
}
