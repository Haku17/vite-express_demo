import "./App.css";

import { useEffect, useState } from "react";
import Form from "./Form";

type Data = {
  id: number;
  name: string;
  price: number;
  description: string;
  date_time: string;
}[];

function App() {
  const [data, setData] = useState<Data | []>([]);
  const [dataUpdate, setDataUpdate] = useState(false);

  useEffect(() => {
    fetch("/products")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [dataUpdate]);

  return (
    <>
      <Form onDataUpdate={setDataUpdate} />
      <div className="App">
        {data.map((info) => (
          <div key={info.id} className="">
            <h2>{info.name}</h2>
            <p>${info.price}</p>
            <p>{info.description}</p>
            <p>{info.date_time}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
