import React, { useState, useEffect } from 'react'
import '../CSS/App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

export default function CRUDDepartment() {

    const [departmentsList, setDepartmentsList] = useState([]);
    const [departmentMatch, setDepartmentMatch] = useState([]);
    let history = useHistory();


    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            history.push("/login");
        } else {
            const loadDepartments = async () => {
                const response = await axios.get("http://localhost:3001/departments");
                setDepartmentsList(response.data);
            };
            loadDepartments();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const searchDepartment = (text) => {
        let matches = departmentsList.filter((kzos) => {
            const regex = new RegExp(`${text}`, "gi");
            return kzos.departmentTitle.match(regex)
        })
        setDepartmentMatch(matches);
    };


    const departmentDelete = (id) => {
        axios.delete(`http://localhost:3001/departments/${id}`).then(() => {
            setDepartmentsList(departmentsList.filter(department => department.id !== id));
            setDepartmentMatch();
        });
    };

    return (
        <div className="content-page">

            <Link className="add" to="odjeli/dodaj">Novi KZOS</Link>

            <input type="text" className='input-serach' onChange={(e) => searchDepartment(e.target.value)} placeholder="Pretraga odjela" />

            {departmentMatch && departmentMatch.map((value, key) => {
                return (
                    <table className="card" key={key}>
                        <tr className="card-content">

                            <td className="department">
                                <h3>{value.departmentTitle}</h3>
                            </td>
                            <td className="alias">
                                <h3>{value.alias}</h3>
                            </td>
                            <td className="name" />

                            <td className="number" />

                            <td className="region">
                                <h3>{value.Region.regionTitle}</h3>
                            </td>

                            <td className="card-btn">
                                <Link className="edit" to={`/odjeli/uredi/${value.id}`}>
                                    <FontAwesomeIcon icon={faPenToSquare} className="edit" />
                                </Link>
                            </td>
                            <td className="card-btn">
                                <FontAwesomeIcon icon={faTrash} className="delete" onClick={() => { departmentDelete(value.id) }} />
                            </td>
                        </tr>
                    </table>

                );
            })
            }
        </div>

    )
}
