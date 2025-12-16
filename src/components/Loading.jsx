import React from 'react';

function Loading({ message = 'Loading...' }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
            flexDirection: 'column'
        }}>
            <div style={{
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #007bff',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{ marginTop: '1rem', color: '#666' }}>{message}</p>
            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

export default Loading;