import React from 'react';
import { defaults, Line } from 'react-chartjs-2';

// Deafult font for the charts
defaults.global.defaultFontFamily = 'Nunito';

const Charts = ({tracksFeatures}) => {

    console.log(tracksFeatures);

    const features = tracksFeatures.map( track => track[1]);
    const danceability = features.map( track => track.danceability);
    const energy = features.map( track => track.energy);
    const valence = features.map( track => track.valence);
    const labels = features.map( () => "");

    const data = (arr, label, color) =>{

        return {
            labels: labels,
            datasets: [
            {
                label: label,
                fill: false,
                lineTension: 0,
                backgroundColor: '#eeeeee',
                borderColor: '#eeeeee',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'round',
                borderWidth: 3,
                //pointBorderColor: color,
                //pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 3,
                //pointHoverBackgroundColor: color,
                //pointHoverBorderColor: color,
                pointHoverBorderWidth: 3,
                pointRadius: 1,
                pointHitRadius: 3,
                data: arr,
          /*      backgroundColor: [
                    pattern.draw('square', '#ff6384'),
                    pattern.draw('circle', '#36a2eb'),
                    pattern.draw('diamond', '#cc65fe'),
                    pattern.draw('triangle', '#ffce56')
                ]
            */
            }
            ]
        }
    };

    const options = function(yLabel){
        return {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    display: false,
                    scaleLabel: {
                        display: false,
                        
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: yLabel,
                        fontFamily: 'Nunito',
                        fontStyle: 'bold',
                        fontSize: 16,
                        fontColor: '#eeeeee'
                    },
                    gridLines: {
                        display:false
                    },
                    ticks: {
                        display: false //this will remove only the label
                    }
                }]
            }
        }
    } 

    return ( 
        <div className="charts">
            <div className="chart"> 
                <Line
                    data={data(danceability, "Danceability", "green")}
                    options={options("Danceability")}
                />
            </div>
            <div className="chart">
                <Line 
                    data={data(energy, "Energy", "blue")}
                    options={options("Energy")}
                />
            </div>
            <div className="chart">
                <Line 
                    data={data(valence, "Mood", "Yellow")}
                    options={options("Mood")}
                />
            </div>
        </div>
     );
}
 
export default Charts;