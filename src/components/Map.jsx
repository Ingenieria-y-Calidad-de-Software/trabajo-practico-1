import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    height: '400px',
    maxWidth: '100%',
    marginTop: '10px',
};

let currentPosition = {

};


function Map(position) {
    const [coordinate, setCoordinate] = React.useState();
    const [map, setMap] = React.useState(null)


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDNRMow6Cv6ifnFdq8SwXy-HQ2yF4Rkauk"
    })

    const getCoordenates = (event) => {
        const { latLng } = event;
        const lat = latLng.lat();
        const lng = latLng.lng();
        setCoordinate({ lat, lng });
    }


    const onLoad = function getCurrentPosition(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            currentPosition = { lat: latitude, lng: longitude };

            setMap(map)
            map.panTo(currentPosition)
            // const bounds = new window.google.maps.LatLngBounds(currentPosition);
            // map.fitBounds(bounds);
        })

    }

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={16}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={getCoordenates}
            
        >

            <Marker position={coordinate}></Marker>

        </GoogleMap>
    ) : <></>
}

export default Map

