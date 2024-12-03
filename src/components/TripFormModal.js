import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const TripFormModal = ({ show, onClose, onSubmit, formData, setFormData, isEdit }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isEdit ? "Cập nhật Trip" : "Thêm Trip mới"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Trip Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.tripName}
                            onChange={(e) => setFormData({ ...formData, tripName: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Days</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.days}
                            onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Avatar URL</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.avatar}
                            onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {isEdit ? "Cập nhật" : "Thêm"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default TripFormModal;
