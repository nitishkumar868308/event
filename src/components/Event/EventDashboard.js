import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  DropdownButton,
  Dropdown,
  Modal,
  Pagination,
} from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa"; // For the "Add Event" icon
import DefaultPage from "../Common/DefaultPage";

const EventDashboard = () => {
  // Dummy data for events (with initial attendee count)
  const initialEvents = [
    {
      id: 1,
      name: "Music Concert",
      category: "Music",
      date: "2025-05-12",
      description: "A great music concert with popular bands.",
      attendees: 120, // Initial number of attendees
    },
    {
      id: 2,
      name: "Football Match",
      category: "Sports",
      date: "2025-02-10",
      description: "An exciting football match between top teams.",
      attendees: 50,
    },
    {
      id: 3,
      name: "Art Exhibition",
      category: "Art",
      date: "2025-04-20",
      description: "A stunning art exhibition featuring modern artists.",
      attendees: 30,
    },
    {
      id: 4,
      name: "Tech Conference",
      category: "Technology",
      date: "2025-03-15",
      description:
        "The latest trends in technology discussed by industry experts.",
      attendees: 75,
    },
    {
      id: 5,
      name: "Jazz Night",
      category: "Music",
      date: "2025-06-05",
      description: "A night filled with smooth jazz and talented musicians.",
      attendees: 95,
    },
    {
      id: 6,
      name: "Coding Bootcamp",
      category: "Technology",
      date: "2025-07-18",
      description: "A 3-day bootcamp on full-stack development.",
      attendees: 110,
    },
    {
      id: 7,
      name: "Yoga Retreat",
      category: "Health",
      date: "2025-08-12",
      description: "A rejuvenating retreat to relax and unwind.",
      attendees: 45,
    },
    {
      id: 8,
      name: "Dance Competition",
      category: "Art",
      date: "2025-09-01",
      description: "A thrilling competition for dance enthusiasts.",
      attendees: 80,
    },
  ];

  // State for events, filter, and form inputs
  const [events, setEvents] = useState(initialEvents);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("upcoming");

  // State for Event Creation Form
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    category: "",
    date: "",
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  // Calculate the events to display based on the current page
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  // Filter events based on selected category and date
  const filteredEvents = currentEvents.filter((event) => {
    const isCategoryMatch = categoryFilter
      ? event.category === categoryFilter
      : true;
    const isDateMatch =
      dateFilter === "upcoming"
        ? new Date(event.date) >= new Date()
        : new Date(event.date) < new Date();

    return isCategoryMatch && isDateMatch;
  });

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Add the new event to the list
    setEvents([
      ...events,
      {
        id: events.length + 1,
        ...newEvent,
        date: new Date(newEvent.date).toISOString(),
        attendees: 0, // New event starts with 0 attendees
      },
    ]);

    // Close modal and reset form
    setShowModal(false);
    setNewEvent({ name: "", description: "", category: "", date: "" });
  };

  // Pagination: Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total number of pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(events.length / eventsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Handle join event (increase attendees count)
  const handleJoinEvent = (eventId) => {
    setEvents(
      events.map((event) =>
        event.id === eventId
          ? { ...event, attendees: event.attendees + 1 }
          : event
      )
    );
  };

  return (
    <>
      {/* Add Event Button (Top Right) */}
      <Button
        variant="success"
        onClick={() => setShowModal(true)}
        className="ms-auto d-block"
      >
        <FaPlusCircle className="me-2" /> Add Event
      </Button>

      <Container className="mt-5">
        <Row>
          {/* Filters Section */}
          <Col md={3} className="mb-4 mb-md-0">
            <Card className="p-3 shadow-sm">
              <Card.Title>Filters</Card.Title>

              {/* Category Filter */}
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <DropdownButton
                  variant="secondary"
                  title={categoryFilter || "Select Category"}
                  onSelect={(e) => setCategoryFilter(e)}
                >
                  <Dropdown.Item eventKey="">All</Dropdown.Item>
                  <Dropdown.Item eventKey="Music">Music</Dropdown.Item>
                  <Dropdown.Item eventKey="Sports">Sports</Dropdown.Item>
                  <Dropdown.Item eventKey="Art">Art</Dropdown.Item>
                  <Dropdown.Item eventKey="Technology">
                    Technology
                  </Dropdown.Item>
                </DropdownButton>
              </Form.Group>

              {/* Date Filter */}
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <DropdownButton
                  variant="secondary"
                  title={
                    dateFilter === "upcoming"
                      ? "Upcoming Events"
                      : "Past Events"
                  }
                  onSelect={(e) => setDateFilter(e)}
                >
                  <Dropdown.Item eventKey="upcoming">
                    Upcoming Events
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="past">Past Events</Dropdown.Item>
                </DropdownButton>
              </Form.Group>
            </Card>
          </Col>

          {/* Event List Section */}
          <Col md={9}>
            <Row>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <Col xs={12} md={6} lg={4} key={event.id}>
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
                          <strong>Attendees: {event.attendees}</strong>
                        </Card.Text>
                        <Button
                          variant="primary"
                          onClick={() => handleJoinEvent(event.id)}
                        >
                          Join Event
                        </Button>
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

            {/* Pagination */}
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

        {/* Event Creation Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter event name"
                  name="name"
                  value={newEvent.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter event description"
                  name="description"
                  value={newEvent.description}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  value={newEvent.category}
                  onChange={handleInputChange}
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
                  value={newEvent.date}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Create Event
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default EventDashboard;
