'use client';

import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import GridComponent from './gridComponent.jsx';
import AttendanceControl from '../../components/AttendanceControl';

const Teachers = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedClass, setSelectedClass] = useState('10A');
  const [selectedSubject, setSelectedSubject] = useState('math');
  const [attendanceStatus, setAttendanceStatus] = useState('true');
  const [isAttendanceRunning, setIsAttendanceRunning] = useState(false);
  const [presentStudents, setPresentStudents] = useState([]);

  const chartRefs = {
    trend: useRef(null),
    subject: useRef(null),
    distribution: useRef(null),
    monthly: useRef(null),
  };
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const renderChart = (ref, data) => {
      if (ref.current) {
        if (ref.current.chart) ref.current.chart.destroy();
        ref.current.chart = new Chart(ref.current, {
          type: data.labels.length > 5 ? 'line' : 'bar',
          data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
          },
        });
      }
    };

    if (activeSection === 'overview') {
      const trendData = {
        labels: ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '60 +'],
        datasets: [
          {
            label: 'Att%',
            data: [85, 88, 92, 90, 80, 70, 66, 60],
            borderColor: '#4299e1',
            backgroundColor: 'rgba(66, 153, 225, 0.2)',
            tension: 0.4,
            fill: true,
          },
        ],
      };
      const subjectData = {
        labels: ['Discrete Maths', 'Physics', 'Chemestry', 'Field Project'],
        datasets: [
          {
            label: 'Avg Att',
            data: [92, 85, 88, 33, 50],
            backgroundColor: ['#4299e1', '#f6ad55', '#48bb78'],
          },
        ],
      };
      renderChart(chartRefs.trend, trendData);
      renderChart(chartRefs.subject, subjectData);
    } else if (activeSection === 'reports') {
      const distributionData = {
        labels: ['Present', 'Absent'],
        datasets: [
          {
            data: [42, 3],
            backgroundColor: ['#48bb78', '#e53e3e'],
          },
        ],
      };
      const monthlyTrendData = {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [
          {
            label: 'Monthly Att %',
            data: [88, 90, 87],
            borderColor: '#4299e1',
            backgroundColor: 'rgba(66, 153, 225, 0.2)',
            tension: 0.4,
            fill: true,
          },
        ],
      };
      renderChart(chartRefs.distribution, distributionData);
      renderChart(chartRefs.monthly, monthlyTrendData);
    }
  }, [activeSection]);

  return (
    <div className="p-6">
      {/* Navigation */}
      <div className="mb-4">
        <button onClick={() => setActiveSection('overview')}>Overview</button>
        <button onClick={() => setActiveSection('reports')}>Reports</button>
      </div>

      {/* Class and Subject Selection */}
      <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
        <option value="10A">10A</option>
        <option value="10B">10B</option>
      </select>

      <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
        <option value="math">Math</option>
        <option value="physics">Physics</option>
      </select>

      {/* Attendance Control */}
      <AttendanceControl
        isRunning={isAttendanceRunning}
        onStart={() => setIsAttendanceRunning(true)}
        onStop={() => setIsAttendanceRunning(false)}
        presentStudents={presentStudents}
        onStudentsUpdate={setPresentStudents}
        status={attendanceStatus}
        onStatusChange={setAttendanceStatus}
      />

      {/* Charts */}
      {activeSection === 'overview' && (
        <div>
          <canvas ref={chartRefs.trend} />
          <canvas ref={chartRefs.subject} />
        </div>
      )}

      {activeSection === 'reports' && (
        <div>
          <canvas ref={chartRefs.distribution} />
          <canvas ref={chartRefs.monthly} />
        </div>
      )}

      <GridComponent />
    </div>
  );
};

export default Teachers;