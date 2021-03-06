import React, {useState} from 'react'
import Upload from '../components/Upload';
import Depoist from '../components/Depoist';
import Withdraw from '../components/Withdraw';
import Insurancetimeline from '../components/Insurancetimeline';
import ViewUploads from '../components/ViewUploads';


const About = () => {

    
    return (
        <div>
        <div className="flex-box font-face-sn CardPage"> 
        <h1> <b> Insurance Coverage </b> : Use Case Car Damage </h1>
        <Insurancetimeline/>
        
      
                <div className="exchange"> 
                    <div className="column-child"> 
                        <h2> Purchase an Car Insurance Policy by deposit. </h2>
                        <p> Policy Details $200 for car Insurance</p>
                        <div className="exchange-child"> 
                            <Depoist typeOfCall="Claim"> </Depoist>
                        </div>
                        <div className="exchange-child"> 
                            <Withdraw typeOfCall="Claim"> </Withdraw>
                        </div>
                    </div>
             
        </div>

        <Upload/>

        <ViewUploads> </ViewUploads>
        </div>
    </div>
    )
}

export default About
