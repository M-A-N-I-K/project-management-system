import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { ADD_CLIENT } from '../mutations/ClientMutations';
import { GET_CLIENTS } from '../queries/ClientQueries';

function AddClientModal() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [addClient] = useMutation(ADD_CLIENT,
        {
            variables: { name, email, phone },
            update(cache, { data: { addClient } }) {
                const { clients } = cache.readQuery({ query: GET_CLIENTS });
                cache.writeQuery({
                    query: GET_CLIENTS,
                    data: { clients: [...clients, addClient] }
                })
            },
            onError(error) {
                console.error("Mutation error:", error);
                alert("Failed to add Client");
                return;
            }
        });

    const handleSubmit = async () => {
        try {
            await addClient();
            console.log(email, phone, name);
            setName("");
            setEmail("");
            setPhone("");
            alert("Client added successfully!");
        }
        catch (err) {
            console.log(err.message);
        }
    }


    return (
        <>
            <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#addClientModal">
                <div className="d-flex align-items-center">
                    <FaUser className='icon' />
                    <div>Add Client</div>
                </div>
            </button>

            <div className="modal fade" id="addClientModal" role="dialog" aria-labelledby="addClientModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addClientModalLabel">Add Client</h5>
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

                                    <label className='form-label'>Email</label>
                                    <input type="email" className="form-control" id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-3">

                                    <label className='form-label'>Phone</label>
                                    <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <button onClick={handleSubmit} type='button' className="btn btn-secondary" data-dismiss="modal">
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

export default AddClientModal
