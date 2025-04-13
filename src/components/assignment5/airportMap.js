import React from "react";
import { geoPath, geoMercator } from "d3-geo";
import { Routes } from './routes'
import { count } from "d3";


function AirportMap(props){
    // const {width, height, countries, airports, routes, selectedAirlineID} = props;
    const {width, height, countries, airports, routes, selectedAirline} = props;

    //TODO: 
    // 1.Define a projection which is geoMercator; 
    // set .scale(97), and .translate([width/2, height/2+20]); 
    // 2. Define a path generator using geoPath();
    // 3. Plot the world map; remember to use countries.features.map(); (Note: stroke is "#ccc", and color is "#eee");
    // 4. Plot the airports; remember to use routes.map(); (Note: radius is 1; color is "#2a5599"); 

    // 1. 定义 Mercator 投影
    let projection = geoMercator()
        .scale(97)
        .translate([width / 2, height / 2 + 20]);

    // 2. 定义 path 生成器
    const pathGenerator = geoPath().projection(projection);

    return <g>
        {/* 3. 绘制世界地图 */}
        {
            countries.features.map((feature, i) => (
                <path
                    key={i}
                    d={pathGenerator(feature)}
                    fill="#eee"
                    stroke="#ccc"
                />
            ))
        }

        {/* 4. 绘制所有机场点 */}
        {
            airports.map((airport, i) => {
                const [x, y] = projection([+airport.Longitude, +airport.Latitude]);
                return (
                    <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r={1}
                        fill="#2a5599"
                    />
                );
            })
        }

        {/* 保留已有：绘制 airline 线路 */}
        <Routes projection={projection} routes={routes} selectedAirlineID={selectedAirline}/>

    </g>
}

export { AirportMap }