import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import './Admin.css';


export default function DepartmentAdd() {

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

  const initialValues = {
    RegionId: "",
    departmentTitle: "",
    alias: "",
  };

  const validationSchema = Yup.object().shape({
    RegionId: Yup.string().required("Obavezan odabir!"),
    departmentTitle: Yup.string().required("Naziv odjela je obavezno polje!"),
    alias: Yup.string().required("Naziv aliasa je obavezno polje!")
      .min(3, "Ne smije biti manji ili duži od tri slova")
      .max(3, "Ne smije biti manji ili duži od tri slova"),
  });

  const addDepartment = (data) => {
    axios.post("http://localhost:3001/departments", data).then((response) => {
      console.log(data);
      history.push('/odjeli');
    });
  };


  return (
    <div className="form">
      <Formik initialValues={initialValues} onSubmit={addDepartment} validationSchema={validationSchema}>

        <Form className="formContainer">
          <Field
            as="select"
            id="input"
            name="RegionId"
          >
            {/*<option disabled selected></option>*/}
            <option placeholder="Lokalitet"></option>
            {listOfRegions.map((value, key) => {
              return (
                <option key={key} value={value.id}
                  onSelect={event => setListOfRegions(event.target.value)}> {value.regionTitle} </option>
              );
            })
            }
          </Field>
          <ErrorMessage name="RegionId" component="span" />

          <Field
            autoComplete="off"
            id="input"
            name="departmentTitle"
            placeholder="Novi odjel"
          />
          <ErrorMessage name="departmentTitle" component="span" />

          <Field
            autoComplete="off"
            id="input"
            name="alias"
            placeholder="Alias"
          />
          <ErrorMessage name="alias" component="span" />

          <button type="submit">Dodaj</button>
          <button type='button' className="cancel" onClick={history.goBack}>Otkaži</button>
        </Form>

      </Formik>


    </div>
  )
}

