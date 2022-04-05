import Navigation from "../../../components/Project/Navigation";
import { getServerSideProps } from ".";

export default function Project({ project }) {
  console.log(project);
  return (
    <>
      <Navigation />
      <div>Content {project.name}</div>
    </>
  );
}

export { getServerSideProps };
