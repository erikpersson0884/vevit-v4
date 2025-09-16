import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    const [redirect, setRedirect] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(3);

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsLeft((prev) => (prev > 1 ? prev - 1 : prev));
        }, 1000);
        const timer = setTimeout(() => setRedirect(true), 3000);
        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, []);

    if (redirect) {
        return <Navigate to="/" replace />;
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '10vh' }}>
            <h1>404 </h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <p>Redirecting to main page in {secondsLeft}</p>
        </div>
    );
};

export default NotFoundPage;