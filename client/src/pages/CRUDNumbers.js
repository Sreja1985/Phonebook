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

function CRUDNumbers() {

    const [numberList, setNumberList] = useState([]);
    const [text, setText] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showNumber, setShowNumber] = useState([]);
    const [eye, setEye] = useState();
    let history = useHistory();


    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            history.push("/login");
        } else {
            const loadNumbers = async () => {
                const response = await axios.get("http://localhost:3001/numbers/admin");
                setNumberList(response.data);
                //console.log("Brojevi", response.data);
            };
            loadNumbers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const onChangeHandler = (text) => {
        let matches = [];

        if (text.length > 0) {
            matches = numberList.filter((index) => {
                const regex = new RegExp(`${(text)}`, "gi");
                return index.number.toString().match(regex);
            })

        }
        console.log('matches', matches);
        setSuggestions(matches);
        setText(text);

    }

    const onSuggestHandler = (text, number) => {
        setText(text);
        setSuggestions([]);
        onSubmit(number.id);
    };

    const onSubmit = (id) => {
        axios.get(`http://localhost:3001/numbers/admin/byId/${id}`).then((response) => {
            setShowNumber(response.data);
            setEye(id);

        });
        return setShowNumber;
    }


    const setVisible = () => {
        let id = eye;
        axios.put("http://localhost:3001/numbers/admin/visible",
            {
                id: id,
            }).then((response) => {
                //setShowNumber(showNumber, setShow(prev => !prev)); /// rađeno 18.04.   11:52
                //setShowNumber({ showNumber: [...showNumber, ...[response.data]] });
                //window.location.reload(false);
                //setShowNumber(showNumber => [...showNumber, response.data]);
                //setShowNumber(showNumber => [...showNumber, numberList]);
                //setShowNumber([...showNumber, { id: id, ...showNumber }]);
                //setShowNumber(showNumber);
                //setShowNumber(showNumber => [...numberList, showNumber(id)]);
                //setShowNumber([...numberList, showNumber]);
                //setShowNumber(showNumber.filter(number => number.id !== id));
                /*
                const updateButton = update =>
                    setShowNumber(showNumber => Object.assign({}, showNumber, update));
                return [showNumber, updateButton]; */
            });

    }

    const setInvisible = () => {
        let id = eye;
        axios.put("http://localhost:3001/numbers/admin/invisible",
            {
                id: id,
            }).then((response) => {
                //setShowNumber(showNumber, response.data);
                //window.location.reload(false);
                setShowNumber(showNumber);
            });
    }

    const deleteNumber = (id) => {
        axios.put("http://localhost:3001/numbers/admin/delete",
            {
                id: id,
            }).then((response) => {
                setShowNumber(showNumber.filter(number => number.id !== id));
            });
    }

    return (
        <div className="content-page">

            <Link className="add" to="broj/dodaj">Novi Broj</Link>

            <input
                type="text"
                className='input-serach'
                maxLength={6}
                onChange={e => onChangeHandler(e.target.value)}
                value={text}
                onBlur={() => {
                    setTimeout(() => {
                        setSuggestions([])
                    }, 100);
                }}
                placeholder="Admin pretraga po broju..."
            />
            {suggestions && suggestions.slice(0, 5).map((suggestion, key) =>

                <div
                    className="suggestions"
                    value={suggestion.id}
                    key={key}
                    onClick={() => onSuggestHandler(suggestion.number, suggestion)}
                >
                    {suggestion.number}
                </div>

            )}

            {showNumber.map((value, key) => {
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


export default CRUDNumbers
