import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import './Admin.css';

export default function NumberEdit() {

  let history = useHistory();
  let { id } = useParams();
  const [numberObject, setNumberObject] = useState([]);

  const [newDepartmentId, setNewDepartmentId] = useState();
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3001/numbers/edit/byId/${id}`).then((response) => {
      setNumberObject(response.data);
      console.log(response.data);
    })
  }, [id]);

  ///Dohvačanje za editiranje broja
  const [listOfRegions, setListOfRegions] = useState([]);
  const [regionId, setRegionId] = useState();
  const [departmentsList, setDepartmentsList] = useState([]);

  useEffect(() => {
    const getRegion = async () => {
      const req = await fetch("http://localhost:3001/regions");
      const res = await req.json();
      setListOfRegions(res);
    }
    getRegion();

  }, []);

  const handleRegion = (e) => {
    const getRegionId = e.target.value;
    setRegionId(getRegionId);
    e.preventDefault();
  }

  useEffect(() => {
    const getDepartment = async () => {
      const req = await fetch(`http://localhost:3001/departments/byRegionId/${regionId}`);
      const res = await req.json();
      //console.log(res);
      setDepartmentsList(res);
    }
    getDepartment();

  }, [regionId]);
  ///

  const editNumber = (e) => {
    e.preventDefault();
    if (newDepartmentId === 'SELECTED' || newName === "" || newNumber === "") {
      console.log("Obavezno polje !");
      setError(true);
    }
    else {
      axios.put("http://localhost:3001/numbers/edit", {
        //RegionId: regionId,
        //id: id,
        newDepartmentId: newDepartmentId,
        newName: newName,
        newNumber: newNumber,
      }).then((response) => {
        //history.goBack();
        console.log(response);

      });
    }
  }

  return (

    <div className='form' onSubmit={editNumber}>

      <form className="formContainer">
        <select
          id="input"
          onChange={(e) => handleRegion(e)}
          name="RegionId"
          value={numberObject.regionTitle}
        //disabled
        >
          {listOfRegions.map((value) => {
            return (
              <option key={value.id} value={value.id} onChange={event => setListOfRegions(event.target.value)}>
                {value.regionTitle}
              </option>
            );
          })
          }
        </select>

        <select
          id="input"
          name="newDepartmentId"
        >
          <option>KZOS...</option>
          {departmentsList.map((value) => {
            return (
              <option key={value.id} value={value.id} onChange={event => setDepartmentsList(event.target.value)}>
                {value.departmentTitle}
              </option>
            );
          })
          }
        </select>

        <input
          autoComplete="off"
          id="input"
          defaultValue={numberObject.name}
          onChange={(event) => { setNewName(event.target.value); }}
          name="newName"
        />
        <input
          autoComplete="off"
          id="input"
          defaultValue={numberObject.number}
          onChange={(event) => { setNewNumber(event.target.value); }}
          name="newNumber"
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


