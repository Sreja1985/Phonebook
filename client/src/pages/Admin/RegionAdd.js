import React from 'react'
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import './Admin.css';


export default function RegionAdd() {

    let history = useHistory();

    const initialValues = {
        regionTitle: "",
    };

    const validationSchema = Yup.object().shape({
        regionTitle: Yup.string().required("Naziv lokaliteta je obavezno polje!"),
    });

    const addRegions = (data) => {
        axios.post("http://localhost:3001/regions", data).then((response) => {
            history.push('/lokaliteti');
        });
    };

    return (
        <div className="form">
            <Formik initialValues={initialValues} onSubmit={addRegions} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <Field
                        autoComplete="off"
                        id="input"
                        name="regionTitle"
                        placeholder="Nova lokacija"
                    />
                    <ErrorMessage name="regionTitle" component="span" />
                    <button type="submit">Dodaj</button>
                    <button type='button' className="cancel" onClick={history.goBack}>Otkaži</button>
                </Form>
            </Formik>

        </div>
    )
}
