import { useEffect, useState } from "react";
import { Data } from "./types/types";

type ItemListProps = {
  itemsUpdate: boolean;
  setItemsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

async function deleteItem(url: string = "", id: { id: number }) {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
  return response.json();
}

export default function ItemList({
  itemsUpdate,
  setItemsUpdate,
}: ItemListProps) {
  const [items, setItems] = useState<Data | []>([]);

  const handleDelete = (id: number) => {
    const idObj = { id };
    deleteItem("/products", idObj);
    setItemsUpdate((value) => !value);
  };

  useEffect(() => {
    fetch("/products")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, [itemsUpdate]);

  return (
    <>
      {items.map((item) => (
        <div key={item.id} className="flex">
          <h2>{item.name}</h2>
          <p>${item.price}</p>
          <p>{item.description}</p>
          <p>{item.date_time}</p>
          <button onClick={() => handleDelete(item.id)}>Delete me!</button>
        </div>
      ))}
    </>
  );
}
