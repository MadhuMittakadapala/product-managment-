import React, { useState, useEffect } from "react";
import "./App.css";

function App() {



  const [products, setProducts] = useState([]);

  const [productName, setProductName] = useState("");

  const [productDescription, setProductDescription] = useState("");
  
  const [productId, setProductId] = useState(0);

  useEffect(() => {
    const productList = JSON.parse(localStorage.getItem("products"));
    if (productList) {
      setProducts(productList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = () => {
    const newProduct = {
      id: Math.random(),
      name: productName,
      description: productDescription,
    };
    setProducts([...products, newProduct]);
    setProductName("");
    setProductDescription("");
  };

  const updateProduct = () => {
    const updatedProduct = {
      id: productId,
      name: productName,
      description: productDescription,
    };
    const updateProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updateProducts);
    setProductName("");
    setProductDescription("");
    setProductId(0);
  };

  const removeProduct = (productIdToRemove) => {
    const updateProducts = products.filter(
      (product) => product.id !== productIdToRemove
    );
    setProducts(updateProducts);
  };

  return (
    <>
    <center>
      <div className="App">
      <h1>Product Management Add and Update and Delete Products</h1>
      <br /><br />
      <label htmlFor="name" className="productname">Product Name:</label>
      <br />
      <input className="productname"
        type="text"
        name="name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      
      <br />
      <label htmlFor="description" className="productdesc">Product Description:</label>
      <br />
      <input
        type="text"
        name="description"
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
      />
      
      <br />
      <br />
      {productId === 0 ? (
        <button onClick={addProduct} className="button">Add Product</button>
      ) : (
        <button onClick={updateProduct} className="button">Update Product</button>
      )}
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Description</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>
                <button onClick={() => setProductId(product.id)} className="button">Edit</button>
              </td>
              <td>
                <button onClick={() => removeProduct(product.id)} className="button">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </center>
    </>
  );
}

export default App;
