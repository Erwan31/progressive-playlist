import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';


const Charts = ({tracksFeatures}) => {

    const features = tracksFeatures.map( track => track[1]);
    const danceability = features.map( track => track.danceability);
    const danceLength = danceability.length;
    const labels = danceability.map( () => "");
    console.log(danceLength, danceability);
    const data = {
        labels: labels,
        datasets: [
          {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: danceability
          }
        ]
      };

    const chartData = {
        labels: [],
        datasets: [{
            data: [{x:0.65}, {x:0.59}, {x:0.80}, {x:0.81}, {x:0.56}, {x:0.55}, {x:0.40}]
        }]
    }

    const options = {
        responsive: true,
        title: {
            display: true,
            text: 'Danceability'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                },
                ticks: {
                    min: 0,
                    max: danceLength
                },
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                },
                ticks: {
                    min: 0,
                    max: 1
                },
            }]
        }
    }

    return ( 
        <div className="chart">
            <Line 
                data={data}
                width={400}
                height={400}
            />
        </div>
     );
}
 
export default Charts;