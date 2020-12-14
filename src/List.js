import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdDone } from "react-icons/md";
const List = ({ items, removeItem, editItem, setComplete }) => {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, name, completed, pieces, cost, category, currency } = item;
        return (
          <article
            key={id}
            className={
              completed
                ? "grocery-item grocery__item--completed"
                : "grocery-item"
            }
          >
            <div className="item">
              <div>
                <h4>{name}</h4>
                <b className="price">
                  {cost * pieces || "No cost "} {currency || "PLN"}
                </b>
                <p>{pieces || "0"} pieces</p>
                <p className="category">
                  Category: <u>{category || "Uknown"}</u>
                </p>
              </div>
              {completed ? <i className="completedNot">completed</i> : null}
              <div className="btn-container">
                <button
                  type="button"
                  className="complete-btn"
                  onClick={() => setComplete(id)}
                >
                  <MdDone className="icons" />
                </button>
                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => editItem(id)}
                >
                  <FaEdit className="icons" />
                </button>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => removeItem(id)}
                >
                  <FaTrash className="icons" />
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
