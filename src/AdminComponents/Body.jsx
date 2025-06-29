import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BodyComponent from './BodyComponent';

import contactIcon from '../Images/Icons/contact.png';
import noticeIcon from '../Images/Icons/notice.png';
import financeIcon from '../Images/Icons/finance.png';
import slideshowIcon from '../Images/Icons/slideshow.png';
import galleryIcon from '../Images/Icons/gallery.png';
import teamIcon from '../Images/Icons/team.png';
import messageIcon from '../Images/Icons/message.png';
import newsIcon from '../Images/Icons/news.png';
import documentIcon from '../Images/Icons/document.png';

function Body() {
    const handleCardClick = (linkId) => {
        window.location.href = `/admin/${linkId}`; // or use React Router navigation
    };

    return (
        <div>
            <Container fluid>
                <Row>

                    <Col sm={12} md={6} lg={4}>
                        <BodyComponent
                            title="Basic Details"
                            description="Update contact and location"
                            image={contactIcon}
                            onClick={() => handleCardClick("contactDetails")}
                        />
                    </Col>

                    <Col sm={12} md={6} lg={4}>
                        <BodyComponent
                            title="Notice"
                            description="Post latest announcements"
                            image={noticeIcon}
                            onClick={() => handleCardClick("notice")}
                        />
                    </Col>

                    <Col sm={12} md={6} lg={4}>
                        <BodyComponent
                            title="Financial Details"
                            description="Edit institutional finances"
                            image={financeIcon}
                            onClick={() => handleCardClick("institutionalDetails")}
                        />
                    </Col>

                    <Col sm={12} md={6} lg={4}>
                        <BodyComponent
                            title="Slideshow Images"
                            description="Manage homepage slider"
                            image={slideshowIcon}
                            onClick={() => handleCardClick("carouselImage")}
                        />
                    </Col>

                    <Col sm={12} md={6} lg={4}>
                        <BodyComponent
                            title="Gallery"
                            description="Upload event photos"
                            image={galleryIcon}
                            onClick={() => handleCardClick("galleryImage")}
                        />
                    </Col>

                    <Col sm={12} md={6} lg={4}>
                        <BodyComponent
                            title="Team Details"
                            description="Add/edit team members"
                            image={teamIcon}
                            onClick={() => handleCardClick("teamDetails")}
                        />
                    </Col>

                    <Col sm={12} md={6} lg={4}>
                        <BodyComponent
                            title="Message"
                            description="Chairperson or GM message"
                            image={messageIcon}
                            onClick={() => handleCardClick("uploadMessage")}
                        />
                    </Col>

                    <Col sm={12} md={6} lg={4}>
                        <BodyComponent
                            title="News"
                            description="Publish latest news"
                            image={newsIcon}
                            onClick={() => handleCardClick("uploadNews")}
                        />
                    </Col>

                    <Col sm={12} md={6} lg={4}>
                        <BodyComponent
                            title="Documents"
                            description="Upload PDF or docs"
                            image={documentIcon}
                            onClick={() => handleCardClick("uploadDocument")}
                        />
                    </Col>


                </Row>
            </Container>
        </div>
    );
}

export default Body;
