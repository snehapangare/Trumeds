import React from 'react'
import { Container } from 'reactstrap'

const Footer = () => {
  return (
    <footer>
        <Container>
            <div className='text-center'>
                {new Date().getFullYear()}
                Myapp build with react.js
            </div>
        </Container>
    </footer>
  )
}

export default Footer