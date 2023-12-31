import { useState } from 'react'
import { FaList } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_PROJECT } from '../mutations/projectMutations'
import { GET_PROJECTS } from '../queries/ProjectQueries'
import { GET_CLIENTS } from '../queries/ClientQueries';
import "../index.css";

function AddProjectModal() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [clientId, setClientId] = useState("");
    const [status, setStatus] = useState("new");


    const [addProject] = useMutation(ADD_PROJECT,
        {
            variables: { name, description, status, clientId },
            update(cache, { data: { addProject } }) {
                const { projects } = cache.readQuery({ query: GET_PROJECTS });
                cache.writeQuery({
                    query: GET_PROJECTS,
                    data: { projects: [...projects, addProject] }
                })
            },
            onError(error) {
                console.error("Mutation error:", error);
                alert("Failed to add Client");
                return;
            }
        });

    const { loading, error, data } = useQuery(GET_CLIENTS);

    const handleSubmit = async () => {
        try {
            if (name === "" || description === "" || status === "") {
                return alert("All fields Required!");
            }
            await addProject(name, description, status, clientId);
            setName("");
            setDescription("");
            setStatus("new");
            setClientId("");
            alert("Project added successfully!");
        }
        catch (err) {
            console.log(err.message);
        }
    }

    if (loading) return null;
    if (error) return "Something went wrong!";

    return (
        <>
            {
                !loading && !error && (
                    <>

                        <button type="button" className="btn btn-primary ml-4" data-toggle="modal" data-target="#addProjectModal">
                            <div className="d-flex align-items-center">
                                <FaList className='icon' />
                                <div>Add Project</div>
                            </div>
                        </button>

                        <div className="modal fade" id="addProjectModal" role="dialog" aria-labelledby="addProjectModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="addProjectModalLabel">New Project</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form >
                                            <div className="mb-3">

                                                <label className='form-label'>Name</label>
                                                <input type="text" className="form-control" id='name' value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                            <div className="mb-3">

                                                <label className='form-label'>Description</label>
                                                <textarea type="description" className="form-control" id='description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                            </div>
                                            <div className="mb-3">
                                                <label className='form-label'>Status</label>
                                                <select
                                                    id='status'
                                                    className='form-select form-select-lg'
                                                    value={status}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                >
                                                    <option value='new'>Not Started</option>
                                                    <option value='progress'>In Progress</option>
                                                    <option value='completed'>Completed</option>
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label className='form-label'>Client</label>
                                                <select
                                                    id='client'
                                                    className='form-select'
                                                    value={clientId}
                                                    onChange={(e) => setClientId(e.target.value)}
                                                >
                                                    <option value=''>Select Client</option>
                                                    {
                                                        data.clients.map((client) => (
                                                            <option key={client.id} value={client.id}>{client.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <button onClick={handleSubmit} type='button' className="btn btn-primary" data-dismiss="modal">
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default AddProjectModal
