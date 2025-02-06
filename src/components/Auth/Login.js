import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Nav,
  Alert,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const { login } = useAuth();
  const navigate = useNavigate();

  // Define Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string().test(
      "name-required",
      "Name is required",
      function (value) {
        if (!isLogin && !value) {
          return this.createError({ message: "Name is required" });
        }
        return true; // Allow other values if it's login
      }
    ),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    const { email, password, name } = values;

    // Mock login logic (replace with actual API call)
    const mockUser = isLogin ? { name: "John Doe", email } : { name, email };
    login(mockUser);
    navigate("/dashboard");
    setSubmitting(false);
  };

  const handleGuestLogin = () => {
    // Handle guest login - no credentials needed
    const guestUser = { name: "Guest User", email: "guest@example.com" }; // This can be customized
    login(guestUser);
    navigate("/guest-dashboard"); // Redirect to guest dashboard or limited features page
  };

  const handleToggle = () => setIsLogin(!isLogin); // Toggle between Login and Register

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100">
        <Col xs={12} sm={10} md={8} lg={6} xl={5} className="mx-auto">
          <Card className="shadow-lg rounded-3">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                {isLogin ? "Login" : "Register"}
              </Card.Title>

              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  errors,
                  touched,
                  isSubmitting,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    {/* Name field for register */}
                    {!isLogin && (
                      <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Enter your name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.name && errors.name}
                          className="rounded-3"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    )}

                    {/* Email field */}
                    <Form.Group controlId="formEmail" className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.email && errors.email}
                        className="rounded-3"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Password field */}
                    <Form.Group controlId="formPassword" className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.password && errors.password}
                        className="rounded-3"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Submit Button */}
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 mb-3 py-2 rounded-3"
                      disabled={isSubmitting}
                    >
                      {isLogin ? "Login" : "Register"}
                    </Button>
                  </Form>
                )}
              </Formik>

              {/* Guest Login as a small link */}
              <div className="text-center mb-3">
                <Nav.Link
                  onClick={handleGuestLogin}
                  className="text-secondary guest-link"
                  style={{ cursor: "pointer" }}
                >
                  Continue as Guest
                </Nav.Link>
              </div>

              <div className="text-center">
                {isLogin ? (
                  <>
                    <span>Don't have an account? </span>
                    <Nav.Link
                      onClick={handleToggle}
                      className="text-primary"
                      style={{ cursor: "pointer" }}
                    >
                      Register here
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <span>Already have an account? </span>
                    <Nav.Link
                      onClick={handleToggle}
                      className="text-primary"
                      style={{ cursor: "pointer" }}
                    >
                      Login here
                    </Nav.Link>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthPage;
