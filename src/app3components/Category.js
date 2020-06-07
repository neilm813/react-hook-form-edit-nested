import React from "react";

const Category = ({ category, dispatch }) => {
  return (
    <div>
      <input
        type="text"
        value={category}
        onChange={(e) =>
          dispatch({ type: "updateCategory", payload: e.target.value })
        }
      />
    </div>
  );
};

export default Category;
