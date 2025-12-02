// src/components/RealTimeNotifier.jsx
import { useEffect, useState } from 'react';
import { startRealTimeConnection, registerNotificationHandler } from '../services/realTimeService';
import { useAuth } from '../context/AuthContext';

const RealTimeNotifier = () => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        let connection;

        const handleNotification = (notification) => {
            setNotifications(prev => [
                {
                    ...notification,
                    id: Date.now(),
                    read: false
                },
                ...prev
            ]);
            
            // Optional: Play sound
            new Audio('/notification-sound.mp3').play();
        };

        if (user) {
            startRealTimeConnection(user.id).then(conn => {
                connection = conn;
                registerNotificationHandler(handleNotification);
            });
        }

        return () => {
            if (connection) connection.stop();
        };
    }, [user]);

    return (
        <div className="fixed bottom-4 right-4 w-80 z-50">
            {notifications.map(notification => (
                <div 
                    key={notification.id}
                    className={`p-4 mb-2 rounded-lg shadow-lg border-l-4 ${
                        notification.Type === 'email' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-green-500 bg-green-50'
                    }`}
                >
                    <h3 className="font-bold">{notification.Title}</h3>
                    <p className="text-sm">{notification.Content}</p>
                    <time className="text-xs text-gray-500">
                        {new Date(notification.Timestamp).toLocaleString()}
                    </time>
                </div>
            ))}
        </div>
    );
};

export default RealTimeNotifier;