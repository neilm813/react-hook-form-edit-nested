import React from "react";

const Category = ({ category, itemIdx, catIdx, dispatch }) => {
  return (
    <>
      <input
        type="text"
        value={category}
        onChange={(e) =>
          dispatch({
            type: "updateCategory",
            payload: { itemIdx, catIdx, cat: e.target.value },
          })
        }
      />
    </>
  );
};

export default Category;
