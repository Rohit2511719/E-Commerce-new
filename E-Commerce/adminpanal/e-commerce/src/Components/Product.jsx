import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./Common.css";

function Product() {
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    productname: "",
    productImage: null,
    productPrice: "",
    productDescription: "",
    productCategory: "",
  });
  const [products, setProducts] = useState([]); // To store fetched products
  const [currentProductId, setCurrentProductId] = useState(null); // To store the ID of the product being edited

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/category/getcategory");
      setCategories(response.data.categories);
    } catch (error) {
      Swal.fire({
        title: "Failed to fetch Categories",
        icon: "error",
      });
    }
  };

  // Fetch products from the server
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/product/get"); // Correct endpoint for products
      setProducts(response.data.products);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch products", "error");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts(); // Fetch products when component mounts
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, productImage: e.target.files[0] });
  };

  // Add new product
  const handleAddProduct = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("productname", formData.productname);
      formDataToSend.append("productImage", formData.productImage);
      formDataToSend.append("productPrice", formData.productPrice);
      formDataToSend.append("productDescription", formData.productDescription);
      formDataToSend.append("productCategory", formData.productCategory);

      await axios.post("http://localhost:3000/product/save", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire("Success", "Product added successfully!", "success");
      setShowModal(false);
      fetchProducts(); // Fetch updated product list after adding new product
    } catch (error) {
      Swal.fire("Error", "Failed to add product", "error");
    }
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/product/delete/${id}`);
      Swal.fire("Deleted!", "Product has been deleted.", "success");
      fetchProducts(); // Refresh product list after deletion
    } catch (error) {
      Swal.fire("Error", "Failed to delete product", "error");
    }
  };

  // Edit product
  const handleEditProduct = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("productname", formData.productname);
      formDataToSend.append("productImage", formData.productImage);
      formDataToSend.append("productPrice", formData.productPrice);
      formDataToSend.append("productDescription", formData.productDescription);
      formDataToSend.append("productCategory", formData.productCategory);

      await axios.put(`http://localhost:3000/product/update/${currentProductId}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire("Success", "Product updated successfully!", "success");
      setEditModal(false);
      fetchProducts(); // Fetch updated product list after edit
    } catch (error) {
      Swal.fire("Error", "Failed to update product", "error");
    }
  };

  // Open edit modal
  const openEditModal = (product) => {
    setCurrentProductId(product._id);
    setFormData({
      productname: product.productname,
      productPrice: product.productPrice,
      productDescription: product.productDescription,
      productCategory: product.productCategory,
      productImage: null, // Don't pre-set the image in the form as it can't be reused
    });
    setEditModal(true);
  };

  return (
    <div className="users-container">
      <div className="top-bar">
        <input className="search-box" type="text" placeholder="Search..." />
        <button className="add-use-btn" onClick={() => setShowModal(true)}>
          Add Product
        </button>
      </div>

      {/* Display Products */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Image</th>
            <th>Product Price</th>
            <th>Product Description</th>
            <th>Product Category</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <td>{product.productname}</td>
                <td>
                  <img
                    src={`http://localhost:3000/uploads/${product.productImage}`}
                    alt={product.productname}
                    width="50"
                  />
                </td>
                <td>{product.productPrice}</td>
                <td>{product.productDescription}</td>
                <td>{product.productCategory}</td>
                <td>
                  <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                </td>
                <td>
                  <button onClick={() => openEditModal(product)}>Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No products available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for Adding a Product */}
      {showModal && (
        <div className="modle-overlay">
          <div className="modle">
            <h3>Add New Product</h3>
            <form
              className="user-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddProduct();
              }}
            >
              <label>Product Name:</label>
              <input
                type="text"
                name="productname"
                value={formData.productname}
                onChange={handleInputChange}
              />
              <label>Product Image:</label>
              <input
                type="file"
                name="productImage"
                onChange={handleFileChange}
              />
              <label>Product Price:</label>
              <input
                type="text"
                name="productPrice"
                value={formData.productPrice}
                onChange={handleInputChange}
              />
              <label>Product Category:</label>
              <select
                name="productCategory"
                value={formData.productCategory}
                onChange={handleInputChange}
              >
                <option value="">--Select a Category--</option>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category._id} value={category.categoryname}>
                      {category.categoryname}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No categories found
                  </option>
                )}
              </select>

              <label>Product Description:</label>
              <input
                type="text"
                name="productDescription"
                value={formData.productDescription}
                onChange={handleInputChange}
              />
              <div className="modal-buttons">
                <button type="submit" className="save-btn">
                  Save
                </button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Editing a Product */}
      {editModal && (
        <div className="modle-overlay">
          <div className="modle">
            <h3>Edit Product</h3>
            <form
              className="user-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleEditProduct();
              }}
            >
              <label>Product Name:</label>
              <input
                type="text"
                name="productname"
                value={formData.productname}
                onChange={handleInputChange}
              />
              <label>Product Image:</label>
              <input
                type="file"
                name="productImage"
                onChange={handleFileChange}
              />
              <label>Product Price:</label>
              <input
                type="text"
                name="productPrice"
                value={formData.productPrice}
                onChange={handleInputChange}
              />
              <label>Product Category:</label>
              <select
                name="productCategory"
                value={formData.productCategory}
                onChange={handleInputChange}
              >
                <option value="">--Select a Category--</option>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category._id} value={category.categoryname}>
                      {category.categoryname}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No categories found
                  </option>
                )}
              </select>

              <label>Product Description:</label>
              <input
                type="text"
                name="productDescription"
                value={formData.productDescription}
                onChange={handleInputChange}
              />
              <div className="modal-buttons">
                <button type="submit" className="save-btn">
                  Update
                </button>
                <button type="button" onClick={() => setEditModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
