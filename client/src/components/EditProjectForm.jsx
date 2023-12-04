import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_PROJECT } from '../mutations/projectMutations'
import { GET_PROJECT } from '../queries/ProjectQueries';

function EditProjectForm({ project }) {
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState(() => {
        switch (project.status) {
            case "Not Started":
                return "new";
            case "In Progress":
                return "progress";
            case "Completed":
                return "completed";
            default:
                throw new Error(`Unknown status: ${project.status}`);
        }
    });


    const [updateProject] = useMutation(UPDATE_PROJECT,
        {
            variables: { id: project.id, name, description, status },
            refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }]
        });


    const handleSubmit = async () => {
        try {
            if (name === "" || description === "" || status === "") {
                return alert("All fields Required!");
            }
            await updateProject(name, description, status);
            setName("");
            setDescription("");
            setStatus("new");
            alert("Project Updated successfully!");
        }
        catch (err) {
            console.log(err.message);
        }
    }


    return (
        <div className='mt-5'>

            <h3>Update Project Details</h3>

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
                        className='form-select'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value='new'>Not Started</option>
                        <option value='progress'>In Progress</option>
                        <option value='completed'>Completed</option>
                    </select>
                </div>


                <button onClick={handleSubmit} type='button' className="btn btn-primary" data-dismiss="modal">
                    Submit
                </button>
            </form>

        </div>

    )
}

export default EditProjectForm
