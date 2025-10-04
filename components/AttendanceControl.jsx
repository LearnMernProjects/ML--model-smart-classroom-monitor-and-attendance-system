import React, { useState, useEffect, useCallback } from 'react';

// API is running on port 5000, must be accessible from the client
const API_BASE_URL = 'http://127.0.0.1:5000/api'; 
const POLLING_INTERVAL = 5000; // 5 seconds

/**
 * AttendanceControl Component - Fixed for visibility
 */
const AttendanceControl = ({
    setIsAttendanceRunning,
    setAttendanceStatus,
    setPresentStudents,
    isAttendanceRunning,
    presentStudents,
}) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusMessage, setStatusMessage] = useState('System ready. Enroll students using the Python console first.');

    // Polling function for attendance results
    const pollForResults = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/attendance/results`, { method: 'GET' });
            const data = await response.json();
            
            if (response.status === 202) {
                setAttendanceStatus("Attendance active. Polling for results...");
                return;
            }

            if (response.ok && data.students_present) {
                setPresentStudents(data.students_present);
                setAttendanceStatus(`Attendance recorded for ${data.students_present.length} students.`);
            } else if (response.status === 204) {
                setAttendanceStatus("Attendance session completed. No students were marked present.");
            } else {
                setAttendanceStatus(`Error getting results: ${data.error || 'Server error.'}`);
            }
            
            setIsAttendanceRunning(false); 

        } catch (error) {
            setAttendanceStatus(`Connection Error: Could not reach Python server (Port 5000).`);
            console.error('Polling Error:', error);
        }
    }, [setAttendanceStatus, setIsAttendanceRunning, setPresentStudents]);

    // Polling effect
    useEffect(() => {
        let intervalId;
        if (isAttendanceRunning) {
            intervalId = setInterval(pollForResults, POLLING_INTERVAL);
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isAttendanceRunning, pollForResults]);

    // Generic API call handler
    const handleAPICall = async (endpoint, successMessage, startPolling = false) => {
        setIsProcessing(true);
        setStatusMessage('Processing request...');
        setAttendanceStatus('Processing request...');
        
        try {
            const response = await fetch(`${API_BASE_URL}/${endpoint}`, { method: 'POST' });
            const data = await response.json();

            if (response.ok || response.status === 202) { 
                setStatusMessage(successMessage);
                if (startPolling) {
                    setPresentStudents([]); 
                    setIsAttendanceRunning(true);
                }
            } else {
                setStatusMessage(`Error: ${data.error || 'Failed to process request.'}`);
                setAttendanceStatus(`API Error: ${data.error || 'Check Python logs.'}`);
            }
        } catch {
            setStatusMessage(`Connection Error: Python API server failed to respond.`);
        } finally {
            setIsProcessing(false);
        }
    };

    // Button handlers
    const handleTrainModel = () => {
        handleAPICall('train', 'Model training successfully sent. Check terminal for completion.', false);
    };

    const handleStartAttendance = () => {
        if (!isAttendanceRunning) {
            handleAPICall('attendance/start', 'Attendance process started! Webcam should open.', true); 
        } else {
            setStatusMessage('Attendance is already running.');
        }
    };
    
    // Main container style
    const containerStyle = {
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        padding: '24px',
        margin: '20px 0',
        border: '2px solid #e5e7eb',
        width: '100%',
        maxWidth: '600px'
    };

    // Button base style
    const buttonBaseStyle = {
        padding: '12px 24px',
        borderRadius: '8px',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        width: '100%',
        minHeight: '50px',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'block',
        textAlign: 'center',
        marginBottom: '12px'
    };

    // Train button style
    const trainButtonStyle = {
        ...buttonBaseStyle,
        backgroundColor: isProcessing || isAttendanceRunning ? '#9CA3AF' : '#F97316',
        color: 'white',
        opacity: (isProcessing || isAttendanceRunning) ? 0.7 : 1
    };

    // Attendance button style
    const attendanceButtonStyle = {
        ...buttonBaseStyle,
        backgroundColor: isAttendanceRunning ? '#EF4444' : '#10B981',
        color: 'white',
        animation: isAttendanceRunning ? 'pulse 2s infinite' : 'none'
    };

    // Status style
    const statusStyle = {
        fontSize: '14px',
        textAlign: 'center',
        fontWeight: '500',
        padding: '12px',
        borderRadius: '8px',
        backgroundColor: '#F9FAFB',
        color: '#374151',
        border: '1px solid #E5E7EB',
        marginTop: '16px'
    };

    return (
        <div style={containerStyle}>
            {/* Add CSS animations */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .spinning {
                    animation: spin 1s linear infinite;
                }
            `}</style>

            {/* Header */}
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <h3 style={{ 
                    fontSize: '24px', 
                    fontWeight: 'bold', 
                    color: '#1F2937', 
                    margin: '0 0 8px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px'
                }}>
                    📹 Face Recognition Control Panel
                </h3>
                <p style={{ color: '#6B7280', fontSize: '14px', margin: 0 }}>
                    Use the buttons below to train the model and start attendance tracking
                </p>
            </div>

            {/* Control Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                
                {/* Train Model Button */}
                <button
                    onClick={handleTrainModel}
                    disabled={isProcessing || isAttendanceRunning}
                    style={trainButtonStyle}
                >
                    {isProcessing && statusMessage.includes('Processing') ? 
                        '⏳ Processing...' : 
                        '🎯 1. Train Model'
                    }
                </button>
                
                {/* Start Attendance Button */}
                <button
                    onClick={handleStartAttendance}
                    disabled={isProcessing || isAttendanceRunning}
                    style={attendanceButtonStyle}
                >
                    {isAttendanceRunning ? (
                        <span>
                            <span className="spinning" style={{ display: 'inline-block', marginRight: '8px' }}>🔄</span>
                            LIVE SCANNING...
                        </span>
                    ) : '🚀 2. Start Attendance'}
                </button>
            </div>
            
            {/* Status Message */}
            <div style={statusStyle}>
                <strong>Status:</strong> {statusMessage}
            </div>

            {/* Present Students Display */}
            {presentStudents && presentStudents.length > 0 && (
                <div style={{
                    marginTop: '16px',
                    padding: '12px',
                    backgroundColor: '#ECFDF5',
                    borderRadius: '8px',
                    border: '1px solid #10B981'
                }}>
                    <h4 style={{ color: '#047857', margin: '0 0 8px 0' }}>
                        Present Students ({presentStudents.length}):
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: '#065F46' }}>
                        {presentStudents.map((student, index) => (
                            <li key={index}>{student}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AttendanceControl;