import { Link, useParams } from "react-router-dom"
import Spinner from "../components/Spinner"
import { useQuery } from "@apollo/client"
import { GET_PROJECT } from "../queries/ProjectQueries"
import ClientInfo from "../components/ClientInfo"
import DeleteProjectButton from "../components/DeleteProjectButton"

function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id: id },
  });
  if (loading) return <Spinner />;
  if (error) return <div>Something went wrong!</div>;
  return (
    <>
      {
        !loading && !error && (
          <div className="mx-auto w-75 p-5 card">
            <Link to="/" className="btn btn-light btn-sm w-25 d-inline mx-auto">
              Back
            </Link>
            <h1> {data.project.name} </h1>
            <p>{data.project.description}</p>

            <h5 className="mt-3">
              Project Status
            </h5>
            <p className="lead">{data.project.status}</p>

            <ClientInfo client={data.project.client} />

            <DeleteProjectButton projectId={data.project.id} />
          </div>
        )
      }
    </>
  )
}

export default Project