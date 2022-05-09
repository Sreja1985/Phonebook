import React from 'react';
import {Link} from 'react-router-dom';
///



export default function Administrator() {

   
    return (
        <div>
            
            <Link to="/lokaliteti">Lokaliteti</Link>
            <br/>
            <Link to="/odjeli">Odjeli</Link>
            <br/>
            <Link to="/brojevi">Brojevi</Link>
            <br/>
            <Link to="/brojevi-odjel">Brojevi po odjelu</Link>

            
        </div>
    )
}
