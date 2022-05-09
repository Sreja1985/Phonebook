import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import './Admin.css';


export default function DepartmentEdit() {

    let history = useHistory();
    let { id } = useParams();
    const [departmentObject, setDepartmentObject] = useState([]);
    //const [regionTitle, setRegionTitle] = useState("");
    const [newDepartmentTitle, setNewDepartmentTitle] = useState("");
    const [newAlias, setNewAlias] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            history.push("/login");
        } else {
            axios.get(`http://localhost:3001/departments/byId/${id}`).then((response) => {
                setDepartmentObject(response.data);
                console.log(response.data);
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);


    const editDepartments = (e) => {
        e.preventDefault();
        if (newDepartmentTitle === "" || newAlias === "") {
            console.log("Obavezno polje");
            setError(true);
        }
        else {
            axios.put("http://localhost:3001/departments/edit",
                {
                    id: id,
                    newTitle: newDepartmentTitle,
                    newAlias: newAlias,
                }).then((response) => {
                    history.push('/odjeli');
                });

        }

    };

    return (
        <div className="form" >
            <form className="formContainer" onSubmit={editDepartments}>
                <input
                    autoComplete="off"
                    id="input"
                    defaultValue={departmentObject.departmentTitle}
                    onChange={(event) => { setNewDepartmentTitle(event.target.value); }}
                    name="newDepartmentTitle"
                    placeholder="Nova lokacija"
                />
                <input
                    autoComplete="off"
                    id="input"
                    defaultValue={departmentObject.alias}
                    onChange={(event) => { setNewAlias(event.target.value); }}
                    name="newAlias"
                    placeholder="Alias"
                />
                {error === true && (
                    <span>Obavezna polja!</span>
                )}
                <button type="submit">Uredi</button>
                <button type='button' className="cancel" onClick={history.goBack}>Otkaži</button>

            </form>
        </div>
    )
}