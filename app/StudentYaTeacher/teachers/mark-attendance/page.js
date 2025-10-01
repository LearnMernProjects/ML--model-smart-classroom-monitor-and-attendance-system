// EMAH/app/StudentYaTeacher/teachers/mark-attendance/page.js
'use client';
import { useState } from 'react';
import AttendanceControl from '../../../../components/AttendanceControl';

export default function MarkAttendancePage() {
    const [isAttendanceRunning, setIsAttendanceRunning] = useState(false);
    const [presentStudents, setPresentStudents] = useState([]);
    const [attendanceStatus, setAttendanceStatus] = useState('Ready to start attendance.');

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '20px' }}>Mark Attendance</h1>
            <AttendanceControl 
                setIsAttendanceRunning={setIsAttendanceRunning}
                setAttendanceStatus={setAttendanceStatus}
                setPresentStudents={setPresentStudents}
                isAttendanceRunning={isAttendanceRunning}
                presentStudents={presentStudents}
            />
        </div>
    );
}