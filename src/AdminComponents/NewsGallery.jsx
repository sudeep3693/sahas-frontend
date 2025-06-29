import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../Constants/config";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import "../Css/NewsGallery.css";

function NewsGallery() {
    const [newsList, setNewsList] = useState([]);

    const fetchNews = async () => {
        try {
            const res = await axios.get(`${config.baseUrl}/news/all`);
            setNewsList(res.data);
        } catch (error) {
            console.error("Failed to fetch news:", error);
        }
    };

    const deleteNews = async (id) => {
        if (!window.confirm("Are you sure you want to delete this news item?")) return;

        try {
            await axios.delete(`${config.baseUrl}/news/delete/${id}`);
            setNewsList(newsList.filter((item) => item.id !== id));
        } catch (error) {
            alert(error.response?.data?.message || "Failed to delete news.");
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <Container className="py-5">
            <h3 className="text-center mb-4 text-danger">All News</h3>
            <Row>
                {newsList.map((item) => (
                    <Col md={6} lg={4} className="mb-4" key={item.id}>
                        <Card className="position-relative news-card shadow-sm h-100">
                            <Button
                                variant="danger"
                                size="sm"
                                className="position-absolute top-0 end-0 m-2 rounded-circle"
                                onClick={() => deleteNews(item.id)}
                            >
                                <FaTimes />
                            </Button>
                            <Card.Img
                                variant="top"
                                src={`${config.baseUrl}/uploads/news/${item.imageName}`}
                                alt={item.heading}
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <Card.Body>
                                <Card.Title>{item.heading}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default NewsGallery;
