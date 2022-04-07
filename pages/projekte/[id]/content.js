import Navigation from "../../../components/Project/Navigation";

export async function getServerSideProps({ params }) {
  const projectId = Number(params.id);

  const project = await prisma.project.findFirst({
    where: { id: projectId },
  });

  return {
    props: { project },
  };
}

export default function Project({ project }) {

  return (
    <>
      <Navigation path={{ name: "Content", id: project.id }} />
      <div>{project.name}</div>
    </>
  );
}

