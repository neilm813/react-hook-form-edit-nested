// Componetized version without reducer

import React, { useCallback, useEffect, useState } from "react";
import "./App.css";

import Item from "./app2components/Item";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    // this is where you would call your db
    const objFromDB = getObjFromDB();

    setTitle(objFromDB.title);
    setDescription(objFromDB.description);
    setItems(objFromDB.items);
    console.log("app useEffect");
  }, []);

  const getObjFromDB = () => {
    return {
      title: "title",
      description: "desc",
      items: [
        {
          name: "item1",
          quantity: 5,
          categories: ["cool", "good"],
        },
        {
          name: "item2",
          quantity: 5,
          categories: ["yum", "tasty"],
        },
      ],
    };
  };

  const updateItem = useCallback(
    (idx, newItem) => {
      const newItems = [...items];
      newItems[idx] = newItem;
      setItems(newItems);
    },
    [items]
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ title, description, items });
  };

  return (
    <div className="App">
      <h1>App2.js</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Description: </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {items.map((item, i) => (
          <React.Fragment key={i}>
            <h3>Sub Item {i + 1}</h3>
            {/* arrow callback saves the current index so that when updateItem is
            called in the Item component, it doesn't need to have it's index
            passed down as well */}
            <Item item={item} updateItem={(val) => updateItem(i, val)} />
          </React.Fragment>
        ))}

        <button>Update</button>
      </form>
    </div>
  );
}

export default App;
