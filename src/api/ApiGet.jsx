import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ApiGet() {

    const [dato, setDato] = useState([]);

    const URL = 'http://localhost:9000/notaslistas/v1/notas';

    useEffect(() => {
     
        axios.get(URL).then(response =>{
            console.log(response.data);
            
        }).catch(error =>{
            console.log("error en la peticion", error);
        });
    
      
    }, [])
    



  return (
    <div>ApiGet
        
    </div>
  )
}
