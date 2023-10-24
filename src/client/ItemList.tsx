import { useEffect, useState } from "react";
import { Data } from "./types/types";

type ItemListProps = {
  itemsUpdate: boolean;
  setItemsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setEditItems: React.Dispatch<React.SetStateAction<boolean>>;
  setEditInputs: React.Dispatch<React.SetStateAction<Data>>;
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
  setEditItems,
  setEditInputs,
}: ItemListProps) {
  const [items, setItems] = useState<Data[] | []>([]);

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
    <table className="min-w-full mt-8">
      <thead>
        <tr>
          <th className="text-left">Name</th>
          <th className="text-left">Price</th>
          <th className="text-center">Desription</th>
          <th className="text-right">Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            key={item.id}
            className="bg-gray-100 even:bg-gray-200 hover:bg-slate-300"
          >
            <td className="border text-left p-4">{item.name}</td>
            <td className="border text-left p-4">${item.price}</td>
            <td className="border text-center p-4">{item.description}</td>
            <td className="border text-right p-4">{item.date_time}</td>
            <td className="flex gap-2 border text-center p-4">
              <button
                className="bg-red-400 p-2 rounded-lg border cursor-pointer hover:bg-red-600 hover:text-white"
                onClick={() => handleDelete(item.id)}
              >
                Delete me!
              </button>
              <button
                className="bg-stone-300 p-2 rounded-lg cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  setEditInputs({
                    name: item.name,
                    price: item.price,
                    description: item.description,
                    date_time: item.date_time,
                    id: item.id,
                  });
                  setEditItems(true);
                }}
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
