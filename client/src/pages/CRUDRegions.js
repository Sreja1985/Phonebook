import React, { useState, useEffect } from 'react'
import '../CSS/App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';



export default function CRUDRegions() {


    const [listOfRegions, setListOfRegions] = useState([]);
    let history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            history.push("/login");
        } else {
            axios.get("http://localhost:3001/regions").then((response) => {
                setListOfRegions(response.data);
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const regionDelete = (id) => {
        axios.delete(`http://localhost:3001/regions/${id}`).then(() => {
            setListOfRegions(listOfRegions.filter(region => region.id !== id));
        });
    };

    return (
        <div className="content-page">

            <Link className="add" to="lokaliteti/dodaj">Novi lokalitet</Link>

            Lokaliteti
            {listOfRegions.map((value, key) => {
                return (
                    <table className="card" key={key}>
                        <tr className="card-content">
                            <td className="region">
                                <h3>{value.regionTitle}</h3>
                            </td>
                            <td className="department" />

                            <td className="alias" />

                            <td className="name" />

                            <td className="number" />


                            <td className="card-btn">
                                <Link className="edit" to={`/lokaliteti/uredi/${value.id}`}>
                                    <FontAwesomeIcon icon={faPenToSquare} className="edit" />
                                </Link>
                            </td>
                            <td className="card-btn">
                                <FontAwesomeIcon icon={faTrash} className="delete" onClick={() => { regionDelete(value.id) }} />
                            </td>
                        </tr>
                    </table>

                );
            })}
        </div>
    );
}
