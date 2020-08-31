import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';


const Charts = ({tracksFeatures}) => {

    const features = tracksFeatures.map( track => track[1]);
    const danceability = features.map( track => track.danceability);
    const energy = features.map( track => track.energy);
    const valence = features.map( track => track.valence);
    const length = features.length;
    const labels = features.map( () => "");
    console.log(length, danceability);


    const data = (arr, label, color) =>{
        return {
            labels: labels,
            datasets: [
            {
                label: label,
                fill: false,
                lineTension: 0.1,
                backgroundColor: color,
                borderColor: color,
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: color,
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: color,
                pointHoverBorderColor: color,
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: arr
            }
            ]
        }
    };

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
                    max: length
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
        <div className="charts">
            <Line
                className="chart" 
                data={data(danceability, "Danceability", "green")}
            />
            <Line 
                className="chart"
                data={data(energy, "Energy", "blue")}
            />
            <Line 
                className="chart"
                data={data(valence, "Mood", "Yellow")}
            />
        </div>
     );
}
 
export default Charts;