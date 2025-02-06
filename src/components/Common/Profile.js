import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Image } from "react-bootstrap";
import { FaEdit, FaSave } from "react-icons/fa"; // For edit and save icons
import "./Profile.css"; // Custom CSS for styling

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "A passionate developer who loves coding and learning new technologies.",
    avatar: "https://www.w3schools.com/w3images/avatar2.png", // Placeholder image
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save the updated profile to an API or local storage here
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={8}>
          <Card className="profile-card shadow-lg border-0">
            <Card.Body className="text-center">
              {/* Profile Picture */}
              <div className="profile-avatar-container mb-4">
                <Image
                  src={profileData.avatar}
                  alt="Profile Picture"
                  className="rounded-circle profile-avatar"
                />
              </div>

              {/* Name */}
              <h3 className="profile-name">
                {isEditing ? (
                  <Form.Control
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="profile-input"
                  />
                ) : (
                  profileData.name
                )}
              </h3>

              {/* Email */}
              <p className="text-muted">
                {isEditing ? (
                  <Form.Control
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="profile-input"
                  />
                ) : (
                  profileData.email
                )}
              </p>

              {/* Bio */}
              <p>
                {isEditing ? (
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    className="profile-input"
                  />
                ) : (
                  profileData.bio
                )}
              </p>

              {/* Edit or Save Button */}
              <Button
                variant={isEditing ? "success" : "primary"}
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className="profile-btn"
              >
                {isEditing ? <FaSave /> : <FaEdit />} {isEditing ? "Save" : "Edit"}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
