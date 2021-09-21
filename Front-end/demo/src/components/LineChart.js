import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const LineChart = () => {
    // we gonna need to past UserAddress or Username 
    const [chartData, setChartData] = useState({});

    const chart = () => {
    let accountTotal = [];
    let latestMonth = [];
    
    //   `${domainUrl}${url}`
    // http://dummy.restapiexample.com/api/v1/employees
    const domainUrl = 'http://127.0.0.1:5000';
    const url = '/jubilantmarket/mockuserdata'    
    const usersaddr = '/0x0080' // pass userAddress here through props
    axios
        .get(`${domainUrl}${url}${usersaddr}`)
        .then(res => {
          console.log("response",res);
          const dataObj = res.data 
          accountTotal.push(parseInt(dataObj.account_total));
          latestMonth.push(parseInt(dataObj.latest_month));

          setChartData({
            labels: latestMonth,
            datasets: [
              {
                label: "Total funds",
                data: accountTotal,
                backgroundColor: ["rgba(75, 192, 192, 0.6)"],
                borderWidth: 4
              }
            ]
          });
        })
        .catch(err => {
          console.log(err);
        });
      console.log(accountTotal, latestMonth);
    };
  


    // UseEffect for unmounting
    useEffect(() => {
        chart();
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
