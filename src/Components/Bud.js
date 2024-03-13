import React, { useState, useEffect } from 'react';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './bud.css'

function Bud() {
  const [itemName, setItemName] = useState("");  
  const [itemArray, setItemArray] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items'));
    if (storedItems != null) {
      setItemArray(storedItems);
    }
  }, []);

  const addItem = () => {
    if(itemName !== "") {
      const newItem = { name: itemName, checked: false }; 
      const updatedItems = [...itemArray, newItem];
      setItemArray(updatedItems);
      localStorage.setItem("items", JSON.stringify(updatedItems)); 
      setItemName(""); 
      toast.success('🦄 Wow so easy!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    } else {
      toast.warn('Cannot be Empty', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
        theme: "colored",
        });
    }
  };

  const toggleChecked = (index) => {
    const updatedItems = [...itemArray];
    updatedItems[index].checked = !updatedItems[index].checked;
    setItemArray(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems)); 
  };

  const deleteItem = (index) => {
    const updatedItems = itemArray.filter((_, i) => i !== index);
    setItemArray(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems)); 
    toast.error('🦄 Deleted!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  };

  return (
    <div className='main-container'>
      <div className="custom-input">
        <h1>Grocery Bud</h1>
        <input 
          className='input-bar'
          type="text" 
          name="name" 
          id="name" 
          placeholder="Name" 
          value={itemName} 
          onChange={(e) => setItemName(e.target.value)}
        />
        <button className='input-btn' onClick={addItem}>Add Item</button>
      </div>
      <div className="custom output">
        <div className="cards">
          {itemArray.map((item, index) => (
            <div className="custom-cards" key={index}>
              <input type="checkbox" className="checkbox" checked={item.checked} onChange={() => toggleChecked(index)} />
              <p className={item.checked ? 'parachecked' : 'para'}>{item.name}</p>
              <button onClick={() => deleteItem(index)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Bud;
