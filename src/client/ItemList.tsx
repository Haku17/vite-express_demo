import React, { useEffect, useState } from "react";
import { Data } from "./types/types";

type ItemListProps = {
  itemsUpdate: boolean;
};

export default function ItemList({ itemsUpdate }: ItemListProps) {
  const [items, setItems] = useState<Data | []>([]);

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
        </div>
      ))}
    </>
  );
}
