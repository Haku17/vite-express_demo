import "./App.css";
import { useState } from "react";
import Form from "./Form";
import ItemList from "./ItemList";
import UpdateForm from "./UpdateForm";
import { Data } from "./types/types";

function App() {
  const [itemsUpdate, setItemsUpdate] = useState(false);
  const [editItems, setEditItems] = useState(false);
  const [editInputs, setEditInputs] = useState<Data>({
    name: "",
    price: 0,
    description: "",
    date_time: "",
    id: 0,
  });

  return (
    <>
      {editItems ? (
        <UpdateForm
          name={editInputs.name}
          price={editInputs.price}
          description={editInputs.description}
          date_time={editInputs.date_time}
          id={editInputs.id}
          setEditItems={setEditItems}
        />
      ) : (
        <div className="flex flex-col mx-auto my-12 relative sm:max-w-[850px] justify-center items-center">
          <Form onItemsUpdate={setItemsUpdate} />
          <ItemList
            itemsUpdate={itemsUpdate}
            setItemsUpdate={setItemsUpdate}
            setEditItems={setEditItems}
            setEditInputs={setEditInputs}
          />
        </div>
      )}
    </>
  );
}

export default App;
