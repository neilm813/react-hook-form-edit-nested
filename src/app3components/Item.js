import React from "react";
import Category from "./Category";

const Item = ({ item: { name, quantity, categories }, idx, dispatch }) => {
  return (
    <>
      <div>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) =>
            dispatch({
              type: "updateItem",
              payload: { idx, key: "name", val: e.target.value },
            })
          }
        />
      </div>

      <div>
        <label>Quantity: </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) =>
            dispatch({
              type: "updateItem",
              payload: { idx, key: "quantity", val: e.target.value },
            })
          }
        />
      </div>

      {categories.map((category, i) => (
        <div key={i}>
          <label>Category {i + 1}: </label>
          <Category
            key={i}
            catIdx={i}
            itemIdx={idx}
            category={category}
            dispatch={dispatch}
          />
        </div>
      ))}
    </>
  );
};

export default Item;
