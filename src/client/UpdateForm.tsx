import React, { useState } from "react";
import { Data } from "./types/types";

type UpdateFormProps = Data & {
  setEditItems: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UpdateForm({
  name,
  price,
  description,
  id,
  date_time,
  setEditItems,
}: UpdateFormProps) {
  const [updateData, setUpdateData] = useState<Data>({
    name,
    price,
    description,
    id,
    date_time,
  });

  const handleOnChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    key: "name" | "price" | "description"
  ) => {
    setUpdateData({
      ...updateData,
      [key]: e.target.value,
    });
  };

  return (
    <form className="flex flex-col bg-gray-100 p-4 rounded-xl gap-4 sm:w-[60%]">
      <input
        className="p-2 "
        type="text"
        id="name"
        placeholder="Name"
        value={updateData.name}
        onChange={(e) => handleOnChange(e, "name")}
      />
      <input
        className="p-2"
        type="number"
        id="price"
        placeholder="Price"
        value={updateData.price}
        onChange={(e) => handleOnChange(e, "price")}
      />
      <textarea
        className="p-2"
        id="description"
        placeholder="Description..."
        value={updateData.description}
        onChange={(e) => handleOnChange(e, "description")}
      />
      <button type="submit" className="bg-blue-600 text-white rounded-xl py-2">
        Save
      </button>
      <button
        className="bg-gray-200 text-black py-2 rounded-xl"
        onClick={() => setEditItems(false)}
      >
        Cancel
      </button>
    </form>
  );
}
