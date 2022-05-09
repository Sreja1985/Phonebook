import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import './Admin.css';


export default function RegionEdit() {
    let history = useHistory();
    let { id } = useParams();
    const [regionObject, setRegionObject] = useState([]);
    //const [regionTitle, setRegionTitle] = useState("");
    const [newRegionTitle, setNewRegionTitle] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            history.push("/login");
        } else {
            axios.get(`http://localhost:3001/regions/byId/${id}`).then((response) => {
                setRegionObject(response.data);
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);


    const editRegions = (e) => {
        e.preventDefault();
        if (newRegionTitle === "") {
            console.log("Obavezno polje");
            setError(true);
        }
        else {
            axios.put("http://localhost:3001/regions/edit",
                {
                    id: id,
                    newTitle: newRegionTitle,
                }).then((response) => {
                    history.push('/lokaliteti');
                });

        }

    };

    return (
        <div className="form" >
            <form className="formContainer" onSubmit={editRegions}>
                <input
                    autoComplete="off"
                    id="input"
                    defaultValue={regionObject.regionTitle}
                    onChange={(event) => { setNewRegionTitle(event.target.value); }}
                    name="newRegionTitle"
                    placeholder="Nova lokacija"
                />
                {error === true && (
                    <span>Naziv lokaliteta je obavezno polje!</span>
                )}
                <button type="submit" className="submit">Uredi</button>
                <button type='button' className="cancel" onClick={history.goBack}>Otkaži</button>
            </form>
        </div>
    )
}

