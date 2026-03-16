import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Row, Col, Card, CardText } from 'reactstrap'
import './user.css'

const UserPage = () => {
  const { user } = useSelector(state => state.Auth)

  return (
    <Container className="profile-container">
      <Row className="justify-content-center">
        {user ? (
          <Col md="14">
            <Card className="profile-card p-4">

              <Row>
                {/* LEFT: Image */}
                <Col md="6" className="text-center">
                  <img
                    src={`https://i.pravatar.cc/150?u=${user.username}`}
                    alt="user"
                    className="profile-img"
                  />
                </Col>

                {/* RIGHT: Details */}
                <Col md="8">
                  <h3 className="profile-name">{user.name}</h3>
                  <CardText className="profile-email">{user.username}</CardText>

                  <div className="profile-info">
                    <p><strong>Role:</strong> User</p>
                    <p><strong>Status:</strong> Active</p>
                    <p><strong>Location:</strong> India</p>
                  </div>

                  {/* Buttons */}
                  <div className="profile-actions">
                    <button className="btn btn-primary">Edit Profile</button>
                    <button className="btn btn-outline-danger ms-2">Logout</button>
                  </div>
                </Col>
              </Row>

            </Card>
          </Col>
        ) : (
          <p className="text-center">No User Found</p>
        )}
      </Row>
    </Container>
  )
}

export default UserPage