import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const TripTable = ({ trips, onEdit, onDelete }) => {
    return (
        <Row className="g-4">
            {trips.map((trip, index) => (
                <Col key={trip._id} md={4}>
                    <Card>
                        <Card.Img variant="top" className="card-img-top" src={trip.avatar} alt={trip.tripName} />
                        <Card.Body>
                            <Card.Title className="card-title">{trip.tripName}</Card.Title>
                            <Card.Text className="card-text">
                                <strong>Thời gian:</strong> {new Date(trip.time).toLocaleString()} <br />
                                <strong>Số ngày:</strong> {trip.days} <br />
                                <strong>Giá:</strong> ${trip.price}
                            </Card.Text>
                            <div className="d-flex justify-content-between">
                                <Button variant="warning" onClick={() => onEdit(trip)}>
                                    Sửa
                                </Button>
                                <Button variant="danger" onClick={() => onDelete(trip._id)}>
                                    Xóa
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default TripTable;
