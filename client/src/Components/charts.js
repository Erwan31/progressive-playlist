import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';


const Charts = ({tracksFeatures}) => {

    const features = tracksFeatures.map( track => track[1]);
    const danceability = features.map( track => track.danceability);
    const danceLength = danceability.length;
    console.log(danceLength);

    const chartData = {
        datasets: [{
            data: danceability
        }]
    }

    const options = {
        responsive: true,
        title: {
            display: true,
            text: 'Chart.js Line Chart'
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
                    labelString: 'Month'
                },
                ticks: {
                    min: 0,
                    max: danceability.length,
                    stepSize: 1
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
                data={chartData}
                options={options}
                width="800"
                height="400"
            />
        </div>
     );
}
 
export default Charts;