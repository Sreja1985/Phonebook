import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {Formik, Form, Field,  ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import './Admin.css';

export default function NumberAdd() {

    const [listOfRegions, setListOfRegions] = useState([]);
    const [regionId, setRegionId] = useState('');
    const [departmentsList, setDepartmentsList] = useState([]);
    
    
    

    useEffect(() => {
        const getRegion = async () => {
          const req = await fetch("http://localhost:3001/regions");
          const res = await req.json();
          console.log(res);
          setListOfRegions(await res);
        }
        getRegion();
                    
    }, []);

    const handleRegion= (e) => {
      const getRegionId = e.target.value;
      setRegionId(getRegionId);
      e.preventDefault();
    }
    
    useEffect(() => {
      const getDepartment = async () => {
        const req = await fetch(`http://localhost:3001/departments/byRegionId/${regionId}`);
        const res = req.json();
        setDepartmentsList(await res);
      }  
      
      getDepartment();

    }, [regionId]);
  


    let history = useHistory();

    const initialValues = {
        RegionId: "",
        DepartmentId: "",
        name: "",
        number: "",
    };

       
    const validationSchema = Yup.object().shape({
        RegionId: Yup.string().required("Obavezan odabir odjela!"),
        DepartmentId: Yup.string().required("Obavezan odabir odjela!"),
        name: Yup.string().required("Naziv je obavezno polje!"),       
        number: Yup.string().matches(/^[0-9]+$/, "Neispravni format unosa")
                            .required("Broj je obavezno polje!")
                            .min(5, "Broj znamenki ne smije biti manji od 5 i veći od 6")
                            .max(6, "Broj znamenki ne smije biti manji od 5 i veći od 6"),     

    });

  
    const addNumber = (data) => {
      axios.post("http://localhost:3001/numbers", data).then((response) => {  
          console.log(data);         
          history.goBack();            
      });
  };

 
  return (
    <div className='form'>
           
                <Formik initialValues={initialValues} onSubmit={addNumber}  validationSchema={validationSchema}>                   
                   <Form className="formContainer">
                      <Field
                        as = "select"
                        id="input"
                        name="RegionId" 
                        onClick= { (e) => handleRegion(e)}                                                 
                      >      
                                                                             
                              <option placeholder="Lokalitet">Lokaliteti...</option>
                              { listOfRegions.map((value) => {
                                  return (
                                    <option  key={value.id} value={value.id} onSelect={event => setListOfRegions(event.target.value)}> {value.regionTitle} </option>
                                  );
                                })
                              }                                           
                      </Field>
                      <ErrorMessage name="RegionId" component="span" />                          

                      <Field
                            as = "select"
                            id="input"
                            name="DepartmentId"                                                                                                               
                      >                                                                      
                            <option placeholder="KZOS">KZOS...</option>
                              { departmentsList.map( (value) => {
                                  return (
                                    <option  key={value.id} value={value.id} onSelect={event => setDepartmentsList(event.target.value)}> {value.departmentTitle} </option>
                                  );
                                })
                              }                                                    
                      </Field> 
                      <ErrorMessage name="DepartmentId" component="span" />                                
                        
 
                       <Field
                         autoComplete= "off" 
                         id="input"
                         name="name"
                         placeholder="Naziv"
                       />
                       <ErrorMessage name="name" component="span" />     
 
                         <Field
                         autoComplete= "off" 
                         id="input"
                         name="number"
                         maxLength={6}  
                         placeholder="Broj"
                       />
                       <ErrorMessage name="number" component="span" />  
 
                         <button type="submit">Dodaj</button>                          
                         <button type='button' className="cancel" onClick={history.goBack}>Otkaži</button>                                                                   
                  </Form>                        
               </Formik> 
    </div>
  )
}
