// Non-componetized version

import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [obj, setObj] = useState(null);

  useEffect(() => {
    // this is where you would call your db
    const objFromDB = getObjFromDB();

    setObj(objFromDB);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(obj, "ready to be PUT to database");
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    const objCopy = { ...obj };
    let currVal = objCopy;

    // drill down the key path to update the nested key
    // once at last key (or only key), assign
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const nestedVal = currVal[key];

      if (nestedVal === undefined) {
        return;
      }

      if (i === keys.length - 1) {
        currVal[key] = value;
      } else {
        currVal = currVal[key];
      }
    }

    setObj(objCopy);
  };

  if (obj === null) {
    return "loading";
  }

  return (
    <div className="App">
      <h1>App.js</h1>
      <h2>Update via key path</h2>

      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div>
          <label>Title: </label>
          <input
            type="text"
            name="title"
            onChange={handleOnChange}
            value={obj.title}
          />
        </div>

        <div>
          <label>Description: </label>
          <input
            type="text"
            name="description"
            onChange={handleOnChange}
            value={obj.description}
          />
        </div>

        {obj.items.map((item, i) => (
          <React.Fragment key={i}>
            <h3>Sub Item {i + 1}</h3>
            <div>
              <label>Name: </label>
              <input
                type="text"
                value={item.name}
                onChange={handleOnChange}
                name={`items.${i}.name`}
              />
            </div>

            <div>
              <label>Quantity: </label>
              <input
                type="number"
                value={item.quantity}
                onChange={handleOnChange}
                name={`items.${i}.quantity`}
              />
            </div>

            {item.categories.map((category, j) => (
              <div key={j}>
                <label>Category {j + 1}: </label>
                <input
                  type="text"
                  value={category}
                  onChange={handleOnChange}
                  name={`items.${i}.categories.${j}`}
                />
              </div>
            ))}
          </React.Fragment>
        ))}
        <button>Update</button>
      </form>

      <hr />
    </div>
  );
}

export default App;
