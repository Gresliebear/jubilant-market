import React from 'react'
import LineChart from '../components/LineChart'
import Depoist from '../components/Depoist'

const Home = () => {
    return (
        <div>
        <div className="flex-box">
            <h2> Emergency Medical Fund </h2>
            <LineChart></LineChart>
            <Depoist typeOfCall="EMF"> </Depoist>
        </div>
        </div>
    )
}

export default Home
