import React from 'react'
import {Link} from 'react-router-dom'
import {Nav} from 'react-bootstrap'

const NavBar = () => {
    return (
        <Nav >
            <Nav.Item>
                <Link to='/upload'>Upload</Link>
            </Nav.Item>

            <Nav.Item>
                <Link to='/demo'>Corona</Link>
            </Nav.Item>

            <Nav.Item>
                <Link to='/preview'>Uploaded images</Link>
            </Nav.Item>

            <Nav.Item>
                <Link to='/form'>Form</Link>
            </Nav.Item>
        </Nav>
    )
}

export default NavBar
