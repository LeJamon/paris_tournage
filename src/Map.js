import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';


function MyMap(props) {
  const [coordx, setCoordx] = useEffect();
  const [coordy, setCoordy] = useEffect();
  const [data, setData] = useState(null);
  const id_lieu = props.match.params.id_lieu;


  useEffect(() => {
    // fetch data based on id
    fetch("https://opendata.paris.fr/api/v2/catalog/datasets/lieux-de-tournage-a-paris/exports/json?limit=-1&offset=0&timezone=UTC")
      .then(response => response.json())
      .then(data => setData(data));
  },[]);

  useEffect(()=>{
    const item = data.find(item => item.id_lieu === id_lieu);
    setCoordx(item.coordx); 
    setCoordy(item.coordy); 
  }
  )

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <MapContainer center={[data.coordx, data.coordy]} zoom={15}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      />
      <Marker position={[data.coordx, data.coordy]} />
    </MapContainer>
  );
}

export default MyMap;


