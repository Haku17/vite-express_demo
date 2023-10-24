import React, { useState } from "react";

type FormData = {
  name: string;
  price: number;
  description: string;
};

type FormProps = {
  onItemsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

async function postData(url: string = "", data: FormData) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

function hasRequiredKeys(obj: Object) {
  if (
    obj.hasOwnProperty("name") &&
    obj.hasOwnProperty("price") &&
    obj.hasOwnProperty("description")
  ) {
    return obj as FormData;
  } else {
    throw new Error("invalid object");
  }
}

export default function Form({ onItemsUpdate }: FormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: 0,
    description: "",
  });

  const handleOnChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    key: "name" | "price" | "description"
  ) => {
    setFormData({
      ...formData,
      [key]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validatedFormData = hasRequiredKeys(formData);

    postData("/products", validatedFormData).then((res) => console.log(res));

    // setFormData back to empty object
    setFormData({
      name: "",
      price: 0,
      description: "",
    });
    onItemsUpdate((value) => !value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-gray-100 p-4 rounded-xl gap-4 sm:w-[60%]"
    >
      <input
        className="p-2 "
        type="text"
        id="name"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => handleOnChange(e, "name")}
      />
      <input
        className="p-2"
        type="number"
        id="price"
        placeholder="Price"
        value={formData.price}
        onChange={(e) => handleOnChange(e, "price")}
      />
      <textarea
        className="p-2"
        id="description"
        placeholder="Description..."
        value={formData.description}
        onChange={(e) => handleOnChange(e, "description")}
      />
      <button type="submit" className="bg-blue-600 text-white rounded-xl py-2">
        Save
      </button>
    </form>
  );
}
