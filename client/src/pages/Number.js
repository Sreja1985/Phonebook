import React, {useState, useEffect} from 'react'
import '../CSS/App.css';
import axios from 'axios';

export default function Number() {

    const [numberList, setNumberList] = useState([]);    
    const [text, setText] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showNumber, setShowNumber] = useState([]);
  

    useEffect(() => {
        const loadNumbers = async () => {
            const response = await axios.get("http://localhost:3001/numbers");
            setNumberList(response.data);
            console.log("Brojevi", response.data);
        };
        loadNumbers();         
        
    }, [])
    
 
    const onChangeHandler = (text) => {   
        let matches = [];
        
        if (text.length > 0 ) {
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
            axios.get(`http://localhost:3001/numbers/byId/${id}`).then((response) => {
                setShowNumber(response.data);
                //console.log(id); 
                         
            });
            return setShowNumber;
    }
    

    return (
        <div className="content-page">          
                <input
                type= "text"
                className ='input-serach'  
                maxLength={6}              
                onChange = {e => onChangeHandler(e.target.value)}
                value = {text}
                onBlur = {() => {
                    setTimeout(() => {
                        setSuggestions([])
                    }, 100);
                }}
                placeholder="Pretraga po broju..."
                />
                {suggestions && suggestions.slice(0, 5).map((suggestion, key) => 
                    <div 
                    className="suggestions"
                    value={suggestion.id} 
                    key = {key}                    
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
                            </tr> 
                        </tbody>                
                    </table>
                    );
                }) }      
        </div>
    )
}

