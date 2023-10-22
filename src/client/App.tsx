import "./App.css";

import React, { useEffect, useState } from "react";

type Data = {
  product_id: number;
  name: string;
  price: number;
  description: string;
}[];

function App() {
  const [data, setData] = useState<Data | []>([]);

  useEffect(() => {
    fetch("/products")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  console.log(data);

  return (
    <div className="App">
      {data.map((info) => (
        <React.Fragment key={info.product_id}>
          <h2>{info.name}</h2>
          <p>${info.price}</p>
          <p>{info.description}</p>
        </React.Fragment>
      ))}
    </div>
  );
}

export default App;
