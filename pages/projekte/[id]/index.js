import prisma from "../../../lib/prisma";


export async function getServerSideProps({ params }) {

    const projectId = Number(params.id)
  
    const project = await prisma.project.findFirst({
        where: {id: projectId}
    })
  
    return {
      props: { project },
    };
  }

export default function Project({project}) {
    console.log(project)
    return <div>{project.name}</div>
}