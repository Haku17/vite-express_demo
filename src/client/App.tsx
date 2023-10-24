import "./App.css";

import { useState } from "react";
import Form from "./Form";
import ItemList from "./ItemList";

function App() {
  const [itemsUpdate, setItemsUpdate] = useState(false);

  return (
    <>
      <div className="App">
        <Form onItemsUpdate={setItemsUpdate} />
        <ItemList itemsUpdate={itemsUpdate} />
      </div>
    </>
  );
}

export default App;
