import React, { useState } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import useImageData from './hooks/useImageData';
const AllImages = ({ usedIn, getLink, postLink, displayHeader }) => {


    const { data: images, setData: setImages, refetch, loading, error } = useImageData({usedIn});
    const [toDelete, setToDelete] = useState([]);

    const handleRemove = (filename) => {
        setImages(prev => prev.filter(img => img !== filename));
        setToDelete(prev => [...prev, filename]);
    };

    const handleUpdate = async () => {
        try {
            await Promise.all(
                toDelete.map(filename =>
                    axios.delete(`${postLink}/${filename}`)
                )
            );
            alert('Images updated!');
            refetch();
            setToDelete([]);
        } catch (err) {
            console.error('Failed to delete images:', err);
            alert('Update failed.');
        }

    };

    if (loading) return <p>Loading images...</p>;
    if (error) return <p>Error loading images.</p>;

    return (
        <div className="container my-5">
            <h3 className="text-primary mb-4">{displayHeader}</h3>
            <Row>
                {images.map((filename) => (
                    <Col key={filename} md={4} className="mb-4">
                        <Card className="position-relative shadow">
                            <Button
                                variant="danger"
                                size="sm"
                                className="position-absolute top-0 end-0 m-2"
                                onClick={() => handleRemove(filename)}
                            >
                                ×
                            </Button>
                            <Card.Img
                                variant="top"
                                src={`${getLink}/${filename}`}
                                style={{ height: '250px', objectFit: 'cover' }}
                            />
                            <Card.Body>
                                <Card.Text className="text-muted text-center">{filename}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {toDelete.length > 0 && (
                <div className="text-center">
                    <Button variant="warning" onClick={handleUpdate}>
                        Update
                    </Button>
                </div>
            )}
        </div>
    );
};

export default AllImages;
