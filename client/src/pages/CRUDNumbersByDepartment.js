import React, { useState, useEffect } from 'react'
import '../CSS/App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';



export default function CRUDNumbersByDepartment() {

    const [departmentsList, setDepartmentsList] = useState([]);
    const [text, setText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [numberList, setNumberList] = useState([]);
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


    const onChangeHandler = (text) => {
        let matches = [];

        if (text.length > 0) {
            matches = departmentsList.filter((kzos) => {
                const regex = new RegExp(`${text}`, "gi");
                return kzos.departmentTitle.match(regex);
            })
        }
        console.log('matches', matches);
        setSuggestions(matches);
        setText(text);


    }

    const onSuggestHandler = (text, department) => {
        setText(text);
        setSuggestions([]);
        console.log(text);
        onSubmit(department.id);
    };


    const onSubmit = (departmentId) => {
        axios.get(`http://localhost:3001/numbers/admin/byDepartmentId/${departmentId}`).then((response) => {
            setNumberList(response.data);
            console.log(departmentId);
            console.log(response.data);

        });
        return setNumberList;
    }

    ///
    const setVisible = (id) => {
        axios.put("http://localhost:3001/numbers/admin/visible",
            {
                id: id,
            }).then((response) => {
                //setNumberList(numberList.filter(number => number.id !== id, ...numberList));
                setNumberList(numberList, ...numberList.filter(number => number.id !== id));
            });
    }

    const setInvisible = (id) => {
        axios.put("http://localhost:3001/numbers/admin/invisible",
            {
                id: id,
            }).then((response) => {
                //setNumberList(numberList.filter(number => number.id !== id, ...numberList));
                setNumberList(numberList, ...numberList.filter(number => number.id !== id));
            });
    }
    ///
    const deleteNumber = (id) => {
        axios.put("http://localhost:3001/numbers/admin/delete",
            {
                id: id,
            }).then((response) => {
                setNumberList(numberList.filter(number => number.id !== id));
            });
    }

    return (
        <div className="content-page">

            <Link className="add" to="broj/dodaj">Novi Broj</Link>

            <input
                className='input-serach'
                //pattern='[A-Ž, a-ž]'
                onChange={e => onChangeHandler(e.target.value)}
                value={text}
                onBlur={() => {
                    setTimeout(() => {
                        setSuggestions([])
                    }, 100);
                }}
                placeholder="Admin pretraga po odjelu..."
            />
            {suggestions && suggestions.slice(0, 5).map((suggestion, key) =>
                <div
                    className="suggestions"
                    value={suggestion.id}
                    key={key}
                    onClick={() => onSuggestHandler(suggestion.departmentTitle, suggestion)}
                >
                    {suggestion.departmentTitle} {suggestion.Region.regionTitle}
                </div>
            )}

            {numberList.map((value, key) => {
                return (
                    <table className="card" key={key}>
                        <tbody>
                            <tr className="card-content">
                                <td className="department">
                                    <h3>{value.Department.departmentTitle}</h3>
                                </td>
                                <td className="region">
                                    <h3>{value.Region.regionTitle}</h3>
                                </td>
                                <td className="name">
                                    <h3>{value.name}</h3>
                                </td>
                                <td className="number">
                                    <h3>{value.number}</h3>
                                </td>
                                <td className="card-btn">
                                    <Link className="edit" to={`/broj/uredi/${value.id}`}>
                                        <FontAwesomeIcon icon={faPenToSquare} className="edit" />
                                    </Link>
                                </td>
                                <td className="card-btn">
                                    {(() => {
                                        if (value.visible === true) {
                                            return (
                                                <FontAwesomeIcon icon={faEye} onClick={() => setInvisible(value.id)} className="visible" />
                                            )
                                        } else {
                                            return (
                                                <FontAwesomeIcon icon={faEyeSlash} onClick={() => setVisible(value.id)} className="invisible" />
                                            )
                                        }

                                    })
                                        ()
                                    }

                                </td>
                                <td className="card-btn">
                                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteNumber(value.id)} className="delete" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                );
            })}


        </div>
    )

}
