import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [pieces, setPieces] = useState(0);
  const [cost, setCost] = useState(0);
  const [category, setCategory] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [currency, setCurrency] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, name, category, cost, pieces, currency };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
      setCategory(null);
      setCost("");
      setPieces("");
    } else {
      showAlert(true, "success", "item added to the list");
      const newItem = {
        id: new Date().getTime().toString(),
        name,
        category,
        cost,
        pieces,
        currency,
      };

      setList([...list, newItem]);
      setName("");
      setCost("");
      setPieces("");
      setCategory(null);
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };
  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    const { name, cost, pieces, category } = specificItem;
    setName(name);
    setCategory(category);
    setPieces(pieces);
    setCost(cost);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const setComplete = (id) => {
    setList(
      list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        } else {
          return item;
        }
      })
    );
  };

  return (
    <main>
      <section className="container">
        <article>
          <div className="headling" style={{ marginBottom: "15px" }}>
            <h2>Grocery bud</h2>
            <h3>Going to buy: {list.length} things</h3>
            <h4>
              {"Bought: " +
                list.filter((length) => length.completed === true).length +
                " Things"}
            </h4>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            {alert.show && (
              <Alert {...alert} removeAlert={showAlert} list={list} />
            )}
            <div className="form-control">
              <label htmlFor="product">Product:</label>
              <input
                type="text"
                className="grocery"
                placeholder="e.g. eggs"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="product"
              />
            </div>
            <div className="form-control">
              <label htmlFor="pieces">Pieces:</label>
              <div className="currency">
                <input
                  type="number"
                  className="grocery"
                  placeholder="How many pices?"
                  value={pieces}
                  id="pieces"
                  onChange={(e) => setPieces(e.target.value)}
                />
                <select
                  name="currency"
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="PLN">PLN</option>
                  <option value="¥">YEN</option>
                  <option value="$">DOLLAR</option>
                  <option value="€">EURO</option>
                  <option value="₩">WON</option>
                </select>
              </div>
            </div>
            <div className="form-control">
              <label htmlFor="cost">Cost:</label>
              <input
                type="number"
                className="grocery"
                placeholder="How much?"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="category">Category :</label>
              <select
                name="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Choose...</option>
                <option value="Pharmancy">Pharmancy</option>
                <option value="Groceries">Groceries</option>
                <option value="Cosmetics">Cosmetics</option>
              </select>
            </div>
            <div className="button-container">
              <button type="submit" className="btn">
                {isEditing ? "edit" : "submit"}
              </button>{" "}
              {isEditing ? (
                <button
                  className="btn"
                  onClick={() => {
                    setName("");
                    setCategory("");
                    setPieces("");
                    setCost("");
                    setIsEditing(false);
                  }}
                >
                  Close
                </button>
              ) : null}
            </div>
          </form>
          {list.length > 0 && (
            <div className="grocery-container">
              <List
                items={list}
                removeItem={removeItem}
                editItem={editItem}
                setComplete={setComplete}
              />
              <b>
                {list.reduce((total, product) => {
                  return product.cost * product.pieces + total;
                }, 0)}
                {currency || "PLN"}
              </b>
              <button className="clear-btn" onClick={clearList}>
                clear items
              </button>
            </div>
          )}
        </article>
      </section>
    </main>
  );
}

export default App;
