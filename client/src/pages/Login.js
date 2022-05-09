import React, { useState, useContext } from 'react';
import axios from 'axios';
import '../CSS/App.css';
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";
//import { Link } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let history = useHistory();

  const login = () => {
    const data = { username: username, password: password }; // kreiramo ga zato što ga nemamo sa strane backenda
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      }
      else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        history.push("/administrator");
        window.location.reload(false);
      }
    });
  };

  return (

    <div className='form'>

      <div className="formContainer">
        <input
          type="text"
          className="input"
          placeholder="Korisničko ime..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="password"
          className="input"
          placeholder="Lozinka..."
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button type="submit" onClick={login}>Prijava</button>
        <button type='button' className="cancel" onClick={history.goBack}>Otkaži</button>
      </div>
    </div>
  );
}
