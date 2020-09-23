import React, { Component } from 'react';
import { defaults, Line } from 'react-chartjs-2';

// Deafult font for the charts
defaults.global.defaultFontFamily = 'Anonymous Pro';

const Charts = ({tracksFeatures}) => {

    const features = tracksFeatures.map( track => track[1]);
    const danceability = features.map( track => track.danceability);
    const energy = features.map( track => track.energy);
    const valence = features.map( track => track.valence);
    const length = features.length;
    const labels = features.map( () => "");
    //console.log(length, danceability);


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
                        fontFamily: 'Helvetica',
                        fontStyle: 'bold',
                        fontSize: 17,
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

/*
    <div className="chartLabel">Danceability</div>
    <div className="chartLabel">Energy</div> 
    <div className="chartLabel">Mood</div> 
*/
/* <Chart options={options2} series={series} type="line" width={"100%"} height={"100%"} /> */
/*
{
                <>
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
                </>
            }
*/

/*
    const options2 = {
        options: {
            chart: {
              height: 350,
              type: 'line',
              zoom: {
                enabled: false
              }
            },
            colors: ['#EEEEEE'],
            fill: {
                type: 'gradient',
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
            },
            markers: {
                size: 0,
            },
            title: {
              text: 'Product Trends by Month',
              align: 'left'
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0
              },
            },
            xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            }
          },
    };
    
    const series = [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
        type: 'line',
    }];
*/