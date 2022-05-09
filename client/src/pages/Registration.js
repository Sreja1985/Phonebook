import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../CSS/App.css';

export default function Registration() {

    const initialValues = {
        username: "",
        password: "",
    };

    let history = useHistory();

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, "Korisničko ime mora sadržavati min 3 znaka")
            .max(15, "Korisničko ime mora sadržavati max 15 znakova")
            .required("Molimo vas unesite svoje korisničko ime"),
        password: Yup.string()
            .min(4)
            .max(20)
            .required("Molimo Vas unesite lozinku"),

    });



    const onSubmit = (data) => { //data je objekt koji sadržava username i password, odnosno sve iz tablice Users
        axios.post("http://localhost:3001/auth", data).then(() => {
            console.log(data);
            history.push('/login');
        })
    };


    return (
        <div className='form'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">

                    <Field
                        autoComplete="off"
                        type="text"
                        id="input"
                        name="username"
                        placeholder="Korisnčko ime..."
                    />
                    <ErrorMessage name="username" component="span" />

                    <Field
                        autoComplete="off"
                        type="password"
                        id="input"
                        name="password"
                        placeholder="Lozinka..."
                    />
                    <ErrorMessage name="password" component="span" />

                    <button type="submit">Registracija</button>
                </Form>
            </Formik>

        </div>
    )
}

