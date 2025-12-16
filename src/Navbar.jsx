import React from 'react'
import {Link} from 'react-router-dom'
import { useAuth } from './context/AuthContext'

function Navbar() {
    const { user, logout, isAuthenticated, isAdmin } = useAuth();

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            backgroundColor: '#333',
            color: 'white'
        }}>
            <div style={{display: 'flex', gap: '2rem'}}>
                <Link to='/' style={{color: 'white', textDecoration: 'none'}}>Home</Link>
                <Link to='/products' style={{color: 'white', textDecoration: 'none'}}>Products</Link>
                <Link to='/cart' style={{color: 'white', textDecoration: 'none'}}>Cart</Link>
                {isAuthenticated && (
                    <Link to='/orders' style={{color: 'white', textDecoration: 'none'}}>Orders</Link>
                )}
                <Link to='/contact' style={{color: 'white', textDecoration: 'none'}}>Contact</Link>
                {isAdmin && (
                    <Link to='/admin' style={{color: 'yellow', textDecoration: 'none'}}>Admin</Link>
                )}
            </div>
            
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                {isAuthenticated ? (
                    <>
                        <span>Welcome, {user.name}!</span>
                        <button 
                            onClick={logout}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link 
                        to='/login'
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#007bff',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '4px'
                        }}
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar