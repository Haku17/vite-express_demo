import "./App.css";
import { useState } from "react";
import Form from "./Form";
import ItemList from "./ItemList";

function App() {
  const [itemsUpdate, setItemsUpdate] = useState(false);

  return (
    <>
      <div className="flex flex-col mx-auto relative">
        <Form onItemsUpdate={setItemsUpdate} />
        <ItemList itemsUpdate={itemsUpdate} setItemsUpdate={setItemsUpdate} />
      </div>
    </>
  );
}

export default App;
