// componetized version with useReducer. Could add context API to this as well

import React, { useEffect, useReducer } from "react";
import "./App.css";

import Item from "./app3components/Item";

function App() {
  const topLevelStateUpdate = (state, key, val) => {
    return {
      ...state,
      [key]: val,
    };
  };

  const reducer = (state, action) => {
    let stateCopy = {};

    switch (action.type) {
      case "reset":
        return {};
      case "replace":
        return action.payload;
      case "title":
      case "description":
        const newState = topLevelStateUpdate(
          state,
          action.type,
          action.payload
        );
        return newState;
      case "updateItem":
        const { idx, key, val } = action.payload;
        // deep copy, aka break all refrences including nested (spread is shallow copy, doesn't break nested refs)
        stateCopy = JSON.parse(JSON.stringify(state));
        stateCopy.items[idx][key] = val;
        return stateCopy;
      case "updateCategory":
        const { itemIdx, catIdx, cat } = action.payload;
        stateCopy = JSON.parse(JSON.stringify(state));
        stateCopy.items[itemIdx].categories[catIdx] = cat;
        return stateCopy;
      default:
        throw new Error("Invalid action type dispatched.");
    }
  };

  const [state, dispatch] = useReducer(reducer, {});
  const { title, description, items } = state;

  useEffect(() => {
    // this is where you would call your db
    const objFromDB = getObjFromDB();
    dispatch({ type: "replace", payload: objFromDB });
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

    console.log("ready to PUT to db", state);
  };

  if (items === undefined) {
    return "loading";
  }

  return (
    <div className="App">
      <h1>App3.js</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input
            type="text"
            value={title}
            onChange={(e) =>
              dispatch({ type: "title", payload: e.target.value })
            }
          />
        </div>

        <div>
          <label>Description: </label>
          <input
            type="text"
            value={description}
            onChange={(e) =>
              dispatch({ type: "description", payload: e.target.value })
            }
          />
        </div>

        {items.map((item, i) => (
          <React.Fragment key={i}>
            <h3>Sub Item {i + 1}</h3>
            <Item item={item} idx={i} dispatch={dispatch} />
          </React.Fragment>
        ))}

        <button>Update</button>
      </form>
    </div>
  );
}

export default App;
