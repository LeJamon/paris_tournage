import {useState, useEffect} from "react"; 
import "./App.css";
import { useNavigate } from "react-router-dom";
import MyMap from "./Map";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
function Search() {

  const [research, setResearch] = useState(""); 
  const[researchField, setField] = useState("annee_tournage"); 
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
const [isMapVisible, setMap] = useState(false); 
  const navigate = useNavigate();
  useEffect(() => {
    console.log(researchField);
  }, [researchField])

 

  const handleChampResearch = (event)=>{
    setResearch(event.target.value)
  }

  const handleChampField = async (event)=>{
    const tempo = await event.target.value; 
    setField(tempo);
  }


  async function getData(){
   let request = new XMLHttpRequest();
    request.open("GET","https://opendata.paris.fr/api/v2/catalog/datasets/lieux-de-tournage-a-paris/exports/json?limit=-1&offset=0&timezone=UTC"); 
    request.send(); 
    request.onload=()=>{
      console.log(request);
      if(request.status===200){
        setData(JSON.parse(request.response));
        console.log("data ",data); 
      }
    }
  }

  async function filterData(){
    setFilteredData(
      data.filter(item => item[researchField].toLowerCase().includes(research.toLowerCase()))
    );
  }

    useEffect(()=>{
        getData();
    })
    

    return (
      <div className="container">
          <div className="research-section">
              <label>What are you looking for? (e.g. movie name, a realisator name, an adress etc...)</label>
              <br />
              <select value={researchField} onChange={handleChampField}>
                <option value="annee_tournage">année de tournage</option>
                <option value="nom_tournage" >nom du tournage</option>
                <option value="type_tournage" >type de tournage</option>
                <option value="nom_realisateur" >nom du réalisateur</option>
                <option value="nom_producteur" >nom du producteur</option>
                <option value="adrt_lieu" > arondissement du lieu de tournage</option>
                <option value="date_debut" >date de début</option>
                <option value="date_fin" >date de fin</option>
              </select>
              <br />
              <input type="text" value={research} onChange={e=>handleChampResearch(e)} placeholder="Enter your search here" />
              <br />
              <button onClick={filterData}>Filter data</button>
              <br />
              {filteredData.length > 0 && filteredData.map((item) => (
                  <div key={item.id_lieu} className="data-item"  style={{display: 'flex'}}>
                    <p style={{paddingRight: '10px'}}>{item.annee_tournage}</p>
                    <p style={{paddingRight: '10px'}}>{item.nom_tournage}</p>
                    <p style={{paddingRight: '10px'}}>{item.nom_producteur}</p>
                    <p style={{paddingRight: '10px'}}>{item.nom_realisateur}</p>
                    <button onClick={() => navigate("/map/${item.id_lieu}")}>Map</button>
                    
                  </div>            
            ))}
      </div>  
    </div>
  );
}

export default Search;
