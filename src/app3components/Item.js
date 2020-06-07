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
              action: "updateItem",
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
              action: "updateItem",
              payload: { idx, key: "name", val: e.target.value },
            })
          }
        />
      </div>

      {categories.map((category, i) => (
        <React.Fragment key={i}>
          <label>Category {i + 1}: </label>
          <Category key={i} category={category} dispatch={dispatch} />
        </React.Fragment>
      ))}
    </>
  );
};

export default Item;
