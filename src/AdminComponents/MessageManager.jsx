import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../Constants/config';
import { FaTimes } from 'react-icons/fa';
import '../Css/MessageManager.css';

const baseURL = `${config.baseUrl}/messages`;

function MessageManager() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        contact: '',
        position: 'chairperson',
        image: null,
        message: '',
    });
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await axios.get(`${baseURL}/all`);
            setMessages(res.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFileChange = (e) => {
        setForm({ ...form, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.image) return alert('Please select a photo');

        const existing = messages.find(m => m.position === form.position);
        if (existing) return alert(`Only one ${form.position} allowed.`);

        const formData = new FormData();
        for (let key in form) {
            formData.append(key, form[key]);
        }

        try {
            setLoading(true);
            await axios.post(`${baseURL}/save`, formData);
            setForm({
                name: '',
                email: '',
                contact: '',
                position: 'chairperson',
                image: null,
                message: '',
            });
            fetchMessages();
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, imageName) => {
        if (!window.confirm("Are you sure you want to delete this message?")) return;

        try {
            await axios.delete(`${baseURL}/delete/${id}`, {
                data: { imageName },
            });
            fetchMessages();
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    return (
        <div className="message-manager">
            <h2>Upload Message</h2>

            <form onSubmit={handleSubmit} encType="multipart/form-data" className="message-form">
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                />
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    name="contact"
                    value={form.contact}
                    onChange={handleChange}
                    placeholder="Contact Number"
                    required
                />
                <select name="position" value={form.position} onChange={handleChange}>
                    <option value="chairperson">Chairperson</option>
                    <option value="general_manager">General Manager</option>
                </select>
                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Enter message..."
                    required
                    className="message-paragraph"
                    style={{width:'100%'}}
                />
                <input
                    type="file"
                    name="image"  // important
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Message'}
                </button>
            </form>

            <div className="message-list">
                {messages.map(msg => (
                    <div className="message-item" key={msg._id}>
                        <button
                            className="delete-btn"
                            onClick={() => handleDelete(msg._id, msg.imageName)}
                        >
                            <FaTimes />
                        </button>
                        <img
                            src={`${config.baseUrl}/uploads/messages/${msg.imageName}`}
                            alt={msg.name}
                        />
                        <div className="message-content">
                            <div className="message-header">
                                {msg.name} — {msg.position.replace('_', ' ')}
                            </div>
                            <div className="message-paragraph">{msg.message}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MessageManager;
