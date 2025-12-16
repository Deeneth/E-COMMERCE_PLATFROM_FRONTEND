import React, { useState } from 'react';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Contact form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setFormData({ name: '', email: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Contact Us</h2>
            {submitted && (
                <div style={{ color: 'green', marginBottom: '1rem' }}>
                    Thank you for your message! We'll get back to you soon.
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Name:</label><br />
                    <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} 
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Email:</label><br />
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} 
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Message:</label><br />
                    <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', height: '120px', padding: '0.5rem', marginTop: '0.25rem' }}
                    ></textarea>
                </div>
                <button 
                    type="submit"
                    style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Send Message
                </button>
            </form>
            
            <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <h3>Get in Touch</h3>
                <p><strong>Email:</strong> support@shoppebay.com</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Address:</strong> 123 E-commerce St, Digital City, DC 12345</p>
            </div>
        </div>
    );
}

export default Contact