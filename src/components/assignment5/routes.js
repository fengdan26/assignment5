import React from "react";

function Routes(props){
    const {projection, routes, selectedAirlineID} = props;
    // TODO: 
    // return the routes of the selected airline; 
    // If the selectedAirlineID is null (i.e., no airline is selected), return <g></g>.
    if (!selectedAirlineID) return <g></g>;
    const filteredRoutes = routes.filter(d => String(d.AirlineID) === String(selectedAirlineID));
    return (
        <g>
            {filteredRoutes.map((route, i) => {
                const source = projection([+route.SourceLongitude, +route.SourceLatitude]);
                const dest = projection([+route.DestLongitude, +route.DestLatitude]);

                if (!source || !dest) return null;

                return (
                    <line
                        key={i}
                        x1={source[0]}
                        y1={source[1]}
                        x2={dest[0]}
                        y2={dest[1]}
                        stroke="#992a5b"
                        strokeWidth={0.5}
                        opacity={0.5}
                    />
                );
            })}
        </g>
    );
}

export { Routes }