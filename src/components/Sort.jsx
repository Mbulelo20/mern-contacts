import React from "react";
 
const Buttons = ({ setContacts,category, contacts, filterContact }) => {
  return (
    <>
      <div className="d-flex justify-content-center">
        {category.map((Val, id) => {
          return (
            <button
              className="btn-dark text-white p-1 px-2 mx-5 btn fw-bold"
              key={id}
              onClick={() => filterContact(Val)}
            >
              {Val}
            </button>
          );
        })}
        <button
          className="btn-dark text-white p-1 px-3 mx-5 fw-bold btn"
          onClick={() => setContacts(contacts)}
        >
          All
        </button>
       </div>
    </>
  );
};
 
export default Buttons;