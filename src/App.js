import { useEffect, useState } from "react";
import Card from "./components/Card";
import "./App.css";
import Select from "./components/Select";
import Input from "./components/Input";

function App() {
  // List d'events from open agenda API
  const [records, setRecords] = useState([]);

  // Flag to show "loading.." message to inform user thad data is coming
  const [loading, setLoading] = useState(true); 

  // Params for search events
  const [urlParams, setUrlParams] = useState({
    rows: 10,
    location: "",
  });

  // Call the function to get data at the component's first loading
  useEffect(() => {
    callFetch();
  }, []); 

  // Function to get data from open agenda API
  const callFetch = () => {
    // Flag to inform user that data is coming
    setLoading(true);
    // URL for request data
    const url = `https://data.iledefrance.fr/api/records/1.0/search/?dataset=evenements-publics-cibul&q=${urlParams.location}&rows=${urlParams.rows}&facet=lastdate_begin&refine.lastdate_begin=2024`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Set list of events to show
        setRecords(data.records);
        // Change flag for do not show loading message
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    //same function to handle the changes for 2 params of search
    setUrlParams({ ...urlParams, [e.target.name]: e.target.value }); //rows || location
  };

  return (
    <>
      <div>
        <h1>Liste des évènements culturels</h1>
        <Select handleChange={handleChange} options={[10, 30, 60]} />
        <Input handleChange={handleChange} />
        <button onClick={callFetch}>Rechercher</button>
        {loading ? (
          <div>Chargement en cours</div>
        ) : (
          <div className="cardBloc">
            {records.map((e) => (
              <Card
                key={e.recordid}
                title={e.fields.originagenda_title}
                image={e.fields.thumbnail}
                description={e.fields.description_fr}
                url={e.fields.canonicalurl}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
