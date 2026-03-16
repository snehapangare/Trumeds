import React from 'react'
import { Col, Container, Row } from 'reactstrap'

const ProfilePage = () => {
  return (
    <Container>
        <Row>
            <Col md={4}>
               <img src="" alt='Profile'/>
            </Col>
            <Col md={8}>
            <h3>FullName</h3>
            <p><strong>Email:</strong> email@gmail.com</p>
            <p><strong>UserName:</strong> User name</p>

            </Col>
        </Row>
    </Container>
  )
}

export default ProfilePage