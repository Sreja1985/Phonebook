import React from 'react';
import { Link } from 'react-router-dom';

import '../CSS/App.css'

export default function Footer() {


  return (
    <>
      <div className="footer">
        Srećko Ljubić
        <Link to="/registracija">©</Link>
        2022
      </div>
    </>
  )
}

