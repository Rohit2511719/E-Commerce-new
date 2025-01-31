import React, { useEffect, useState } from "react";
import './common.css';
import Swal from "sweetalert2";
import axios from 'axios';
function Category() {
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [FormData, setFormData] = useState({
        categoryname: "",
    });

    // Fetch Categories from API
    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:3000/category/getcategory");
            setCategories(response.data.categories);
        } catch (error) {
            Swal.fire({
                title: "Failed to fetch Categories",
                icon: "error"
            });
        }
    };

    // Handle Input Change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...FormData, [name]: value });
    };

    // Add New Category
    const handleAddCategory = async () => {
        try {
            await axios.post("http://localhost:3000/category/save", FormData);
            Swal.fire("Success", "Category Added Successfully!", "success");
            setShowModal(false);
            fetchCategories(); // Refresh categories after adding a new one
        } catch (error) {
            Swal.fire({
                title: "Failed to save Category",
                icon: "error"
            });
        }
    };

    // Delete Category
    const handleDeleteCategory = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                await axios.delete(`http://localhost:3000/category/delete/${id}`);
                Swal.fire(
                    'Deleted!',
                    'Category has been deleted.',
                    'success'
                );
                // Refresh the category list after deletion
                fetchCategories();
            }
        } catch (error) {
            Swal.fire({
                title: "Failed to delete Category",
                icon: "error"
            });
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="users-container">
            <div className="top-bar">
                <input className="search-box" type="text" placeholder="Search..." />
                <button className="add-use-btn" onClick={() => setShowModal(true)}>Add Category</button>
            </div>

            {/* Display Data in Table */}
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category._id}>
                            <td>{category.categoryname}</td>
                            <td className="deletebtn" onClick={() => handleDeleteCategory(category._id)}>Delete</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for Adding Category */}
            {showModal && (
                <div className="modle-overlay">
                    <div className="modle">
                        <h3>Add New Category</h3>
                        <form className="user-form" onSubmit={(e) => {
                            e.preventDefault();
                            handleAddCategory();
                        }}>
                            <label>Category Name:</label>
                            <input
                                type="text"
                                name="categoryname"
                                value={FormData.categoryname}
                                onChange={handleInputChange}
                            />
                            <div className="modal-buttons">
                                <button type="button" className="save-btn" onClick={handleAddCategory}>Save</button>
                                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Category;
