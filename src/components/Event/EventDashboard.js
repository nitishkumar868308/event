import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  Pagination,
} from "react-bootstrap";
import { FaPlusCircle, FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../../redux/events/eventSlice";
import { fetchUserData } from "../../redux/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import axios from "axios";

const EventDashboard = () => {
  const dispatch = useDispatch();
  const { events, isLoading } = useSelector((state) => state.events); // Fetch events and loading state from redux
  const { user } = useSelector((state) => state.auth);
  console.log("user", user);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    category: "",
    date: "",
  });
  const [editEvent, setEditEvent] = useState(null);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const socket = io("https://event-backends.onrender.com");
  console.log("events", events);
  const eventsPerPage = 6;

  const today = new Date().setHours(0, 0, 0, 0); // Get today's date at 00:00:00 (midnight)

  const filteredEvents = events.filter((event) => {
    const matchesCategory = categoryFilter
      ? event.category === categoryFilter
      : true; // If no category filter, show all categories

    const eventDate = new Date(event.date).setHours(0, 0, 0, 0); // Strip the time from event date

    const matchesDate =
      dateFilter === "upcoming"
        ? eventDate >= today // Include today and future events in "upcoming"
        : dateFilter === "past"
        ? eventDate < today // Exclude today, include past events
        : true; // If no date filter, show all events (both past and upcoming)

    return matchesCategory && matchesDate;
  });

  useEffect(() => {
    setCurrentPage(1); // Reset to the first page when filters change
  }, [categoryFilter, dateFilter]);

  // Paginate the filtered events
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  // Pagination logic
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredEvents.length / eventsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Fetch user data and events initially
  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditEvent({ ...editEvent, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createEvent(newEvent)).then(() => {
      setShowModal(false);
      setNewEvent({ name: "", description: "", category: "", date: "" });
      dispatch(fetchEvents());
      setCurrentPage(1);
    });
  };

  const handleUpdateEvent = (e) => {
    e.preventDefault();
    dispatch(updateEvent({ id: editEvent._id, eventData: editEvent })).then(
      () => {
        dispatch(fetchEvents());
        setShowModal(false);
      }
    );
  };

  const handleDeleteEvent = () => {
    dispatch(deleteEvent(eventToDelete)).then(() => {
      toast.success("Delete Successful!");
      dispatch(fetchEvents());
      setShowDeleteModal(false); // Close delete modal after deleting
    });
  };

  useEffect(() => {
    socket.on("eventUpdated", (updatedEvent) => {
      console.log("Event updated:", updatedEvent);

      // Update Redux store with the new event data
      dispatch(updateEvent({ id: updatedEvent._id, eventData: updatedEvent }));

      // Alternatively, you can update local state if not using Redux for events:
      // setEvent(updatedEvent);
    });

    // Clean up the socket listener
    return () => {
      socket.off("eventUpdated");
    };
  }, [dispatch]);

  const handleJoinEvent = async (eventId) => {
    const response = await fetch(
      `https://event-backends.onrender.com/api/events/${eventId}/join`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (response.ok) {
      console.log("Event joined successfully!");
    } else {
      console.log("Failed to join the event");
    }
  };

  const openDeleteModal = (eventId) => {
    setEventToDelete(eventId);
    setShowDeleteModal(true);
  };

  console.log("user", user);

  if (!user) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
          backdropFilter: "blur(5px)",
        }}
      >
        <ClipLoader size={50} color="#00bfff" />
      </div>
    );
  }

  return (
    <>
      <ToastContainer />

      <Button
        variant="success"
        onClick={() => {
          setShowModal(true);
          setEditEvent(null); // Reset the edit event when creating a new event
        }}
        className="ms-auto d-block"
      >
        <FaPlusCircle className="me-2" /> Add Event
      </Button>
      <Container className="mt-5">
        <Row>
          <Col md={3}>
            {/* Filter */}
            <Form.Group className="mb-3">
              <Form.Label>Category Filter</Form.Label>
              <Form.Control
                as="select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="Music">Music</option>
                <option value="Sports">Sports</option>
                <option value="Art">Art</option>
                <option value="Technology">Technology</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date Filter</Form.Label>
              <Form.Control
                as="select"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="">Select Date Filter</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={9}>
            {isLoading ? ( // Show loader while fetching data
              <div className="d-flex justify-content-center mt-5">
                <ClipLoader size={50} color="#00bfff" loading={isLoading} />
              </div>
            ) : (
              <Row>
                {currentEvents.length > 0 ? (
                  currentEvents.map((event) => (
                    <Col xs={12} md={6} lg={4} key={event._id}>
                      <Card className="mb-4">
                        <Card.Body>
                          <Card.Title>{event.name}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            {event.category}
                          </Card.Subtitle>
                          <Card.Text>{event.description}</Card.Text>
                          <Card.Text className="text-muted">
                            Date: {new Date(event.date).toLocaleDateString()}
                          </Card.Text>
                          <Card.Text>
                            <strong>Attendees: {event.attendees.length}</strong>
                          </Card.Text>

                          <Button
                            variant="primary"
                            onClick={() => handleJoinEvent(event._id)}
                          >
                            Join Event
                          </Button>
                          {/* Conditionally render edit and delete buttons */}
                          {user && user.id === event.userId && (
                            <>
                              <Button
                                variant="warning"
                                onClick={() => {
                                  setEditEvent(event);
                                  setShowModal(true);
                                }}
                                className="ms-2"
                              >
                                <FaEdit />
                              </Button>
                              <Button
                                variant="danger"
                                onClick={() => openDeleteModal(event._id)}
                                className="ms-2"
                              >
                                <FaTrash />
                              </Button>
                            </>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <Col xs={12}>
                    <p>No events found for the selected filters.</p>
                  </Col>
                )}
              </Row>
            )}
            <Pagination className="justify-content-center">
              {pageNumbers.map((number) => (
                <Pagination.Item
                  key={number}
                  active={number === currentPage}
                  onClick={() => paginate(number)}
                >
                  {number}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>
        </Row>
      </Container>

      {/* Create/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editEvent ? "Edit Event" : "Create New Event"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editEvent ? handleUpdateEvent : handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editEvent ? editEvent.name : newEvent.name}
                onChange={editEvent ? handleEditInputChange : handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={editEvent ? editEvent.description : newEvent.description}
                onChange={editEvent ? handleEditInputChange : handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={editEvent ? editEvent.category : newEvent.category}
                onChange={editEvent ? handleEditInputChange : handleInputChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Music">Music</option>
                <option value="Sports">Sports</option>
                <option value="Art">Art</option>
                <option value="Technology">Technology</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={
                  editEvent
                    ? new Date(editEvent.date).toISOString().split("T")[0]
                    : newEvent.date
                }
                onChange={editEvent ? handleEditInputChange : handleInputChange}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit">
                {editEvent ? "Update Event" : "Create Event"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this event?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteEvent}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EventDashboard;
