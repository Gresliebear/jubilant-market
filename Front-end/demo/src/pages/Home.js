import React from 'react'
import LineChart from '../components/LineChart'
import Depoist from '../components/Depoist'
import Withdraw from '../components/Withdraw'
const Home = () => {
    return (
        <div>
        <div className="flex-box font-face-sn">
            <h1> Emergency Medical Fund </h1>
            <div className="flex-child2 ">
            <LineChart></LineChart>
            </div> 
            <div className="flex-child minibox"> 
                <div className="exchange"> 
                    <div className="column-child"> 
                        <h2> Start a Medical Fund Below and start earning interest. </h2>
                        <div className="exchange-child"> 
                            <Depoist typeOfCall="EMF"> </Depoist>
                        </div>
                        <div className="exchange-child"> 
                            <Withdraw typeOfCall="EMF"> </Withdraw>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Home
