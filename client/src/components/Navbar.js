import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from '@fortawesome/free-solid-svg-icons';

///
import { AuthContext } from '../helpers/AuthContext';
import { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
///

function Navbar() {

    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const handleClick = () => setClick(!click);


    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    };

    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(false);
        }
    };

    ///
    //const [authState, setAuthState] = useState(false);
    let history = useHistory();

    const [authState, setAuthState] = useState({
        username: "",
        id: 0,
        status: false
    });

    useEffect(() => {
        axios.get("http://localhost:3001/auth/authentication", {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
            .then((response) => {
                if (response.data.error) {
                    setAuthState({ ...authState, status: false });
                }
                else {
                    setAuthState({
                        username: response.data.username,
                        id: 0,
                        status: true,
                    });
                }
            });
    }, []);

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({ status: false });
        history.push("/");
    }

    ///

    return (
        <>
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <nav className='navbar'>
                    <Link to='/' className='navbar-logo'>
                        KBC Split
                    </Link>

                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' >
                                Pretraga po broju
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <Link
                                to='/naziv'
                                className='nav-links'
                            >
                                Pretraga po nazivu
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/odjel'
                                className='nav-links'
                            >
                                Pretraga po odjelu
                            </Link>
                        </li>

                        {!authState.status ? (
                            <>
                                <li className='nav-item'>
                                    <Link className="nav-links" to="/login">Prijava</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li
                                    className='nav-item'
                                    onMouseEnter={onMouseEnter}
                                    onMouseLeave={onMouseLeave}
                                >
                                    <Link
                                        to='/administrator'
                                        className='nav-links'
                                    >
                                        Administrator
                                    </Link>
                                    {dropdown && <Dropdown />}
                                </li>
                                <li className='nav-item'>
                                    <FontAwesomeIcon icon={faSignOut} onClick={logout} className="btn-logout" />
                                </li>
                            </>
                        )
                        }

                    </ul>

                </nav>
            </AuthContext.Provider>
        </>
    );
}

export default Navbar;

