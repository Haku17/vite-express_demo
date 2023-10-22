import React, { useState } from "react";

type FormData = {
  name: string;
  price: number;
  description: string;
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

export default function Form() {
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

    postData("/post", validatedFormData).then((res) => console.log(res));

    console.log(validatedFormData);
    // setFormData back to empty object
    setFormData({
      name: "",
      price: 0,
      description: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="name"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => handleOnChange(e, "name")}
      />
      <input
        type="number"
        id="price"
        placeholder="Price"
        value={formData.price}
        onChange={(e) => handleOnChange(e, "price")}
      />
      <textarea
        id="description"
        placeholder="Description..."
        value={formData.description}
        onChange={(e) => handleOnChange(e, "description")}
      />
      <button type="submit">Save</button>
    </form>
  );
}
