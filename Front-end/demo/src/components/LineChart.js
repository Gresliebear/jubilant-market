import React, { useState, useEffect } from "react";
import {useMetaMask} from 'metamask-react';
import { Line } from "react-chartjs-2";
import axios from "axios";

const LineChart = () => {
    // we gonna need to past UserAddress or Username 
    const { status, connect, account } = useMetaMask();
    const [chartData, setChartData] = useState({});


    async function GetGraphData(_address){
    const domainUrl = 'http://127.0.0.1:5000';
    const url = '/jubilantmarket/EMFviewbalance/'    
    const usersaddr = _address // pass userAddress here through props
    const test = domainUrl + url + usersaddr

    const opts = { 
      method:'GET', 
      headers:{ 
          "Content-Type":"application/json"
      },
      body: JSON.stringify({ 
          "userAddress":_address
      })
  
      }
      const myRequest = new Request(opts)
      try{
        const response = await fetch(`${domainUrl}${url}${usersaddr}`, myRequest)
        if(response.status !== 200){
                alert("There is error with API called to EMFDeposit");
                const data = await response.json();
                console.log("this came from the backend", data);
                return data.existence
            }
                const data = await response.json();
                return data
            // setStore({return_msg: data.message});
    
        }catch(error){
            console.error("Failed to send Check with Deposit Button");
        }
    }

    const chart = () => {
    let accountTotal = [];
    let txn_date = [];
    
    GetGraphData(account).then(function(resData){
      console.log(JSON.parse(resData));
      console.log(typeof resData);
      let JObj = JSON.parse(resData)
      console.log(typeof JObj)
      console.log(JObj)
      for (const test of JObj) {
        // console.log(test)
        // console.log(test["accountTotal"])
        // console.log(test["txn_date"])
        accountTotal.push(parseInt(test["accountTotal"]));
        txn_date.push(Date.parse(test["txn_date"]));
      }
      // Date.parse 
      // the parse() method parses a date string and returns the number of milliseconds between the date string and midnight of January 1, 1970.
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
      console.log(accountTotal)
      console.log(txn_date)
      setChartData({
        // x axis for dates
        labels: txn_date,
        datasets: [
          {
            label: "Total funds",
            // y axis for amount in the account 
            data: accountTotal,
            backgroundColor: ["rgba(251, 4, 67, 0.6)"],
            borderWidth: 4
          }
        ]
      });
    })
        }

    // UseEffect for unmounting
    useEffect(() => {
        chart(account);
      }, []);

    return (
        <div>
            <div>
        <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: "Total funds", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        />
      </div>
        </div>
    )
}

export default LineChart
