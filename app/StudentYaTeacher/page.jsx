"use client";

import React, { useState } from 'react';

const ProgressDashboard = () => {
  // Sample data - replace with actual data from your ML model
  const studentData = {
    name: "Viraj Sanjay Naik",
    rollNo: "2024001",
    class: "10th Grade",
    subject: "Mathematics"
  };

  const [selectedLecture, setSelectedLecture] = useState('math-algebra');
  const [timeFrame, setTimeFrame] = useState('today');

  // Sample attentiveness data for 60-minute lecture (6 intervals of 10 minutes each)
  const attentivenessData = {
    'math-algebra': [85, 78, 65, 45, 52, 70], // Percentage attentiveness per 10-min interval
    'physics-mechanics': [92, 88, 75, 68, 58, 65],
    'chemistry-organic': [80, 72, 55, 48, 60, 75]
  };

  // Areas of weakness identified by ML model
  const weaknessAreas = {
    'math-algebra': [
      { topic: 'Quadratic Equations', timeInterval: '30-40 min', severity: 'High', confidence: 85 },
      { topic: 'Factorization', timeInterval: '40-50 min', severity: 'Medium', confidence: 72 }
    ],
    'physics-mechanics': [
      { topic: 'Newton\'s Laws', timeInterval: '40-50 min', severity: 'Medium', confidence: 68 },
      { topic: 'Force Diagrams', timeInterval: '50-60 min', severity: 'Low', confidence: 55 }
    ]
  };

  // Today's attendance data
  const todayAttendance = {
    present: 5,
    total: 6,
    missedLectures: ['English Literature'],
    attendanceRate: 83
  };

  // Chart component for attentiveness graph
  const AttentivenessChart = ({ data }) => {
    const maxValue = Math.max(...data);
    const intervals = ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60'];
    
    return (
      <div className="chart-container">
        {data.map((value, index) => (
          <div key={index} className="chart-bar-container">
            <div 
              className={`chart-bar ${
                value >= 75 ? 'bar-high' : 
                value >= 50 ? 'bar-medium' : 'bar-low'
              }`}
              style={{ height: `${(value / maxValue) * 180}px` }}
            ></div>
            <div className="chart-interval">{intervals[index]} min</div>
            <div className="chart-value">{value}%</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          Your Progress and Areas for Improvement
        </h1>
        <h2 className="dashboard-subtitle">
          AI-powered insights into your learning journey
        </h2>
      </div>

      {/* Student Info Card */}
      <div className="student-info-card">
        <div className="student-info-content">
          <div className="student-avatar">
            {studentData.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="student-name">{studentData.name}</h3>
            <p className="student-details">Roll No: {studentData.rollNo} | {studentData.class}</p>
          </div>
          <div className="timeframe-selector">
            <select 
              value={timeFrame} 
              onChange={(e) => setTimeFrame(e.target.value)}
              className="timeframe-select"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Attentiveness Graph Section - Full Width */}
      <div className="attentiveness-section-full">
        <div className="section-header">
          <h2 className="section-title">Attentiveness During Lecture</h2>
          <select 
            value={selectedLecture} 
            onChange={(e) => setSelectedLecture(e.target.value)}
            className="lecture-select"
          >
            <option value="math-algebra">Mathematics - Algebra</option>
            <option value="physics-mechanics">Physics - Mechanics</option>
            <option value="chemistry-organic">Chemistry - Organic</option>
          </select>
        </div>
        
        <AttentivenessChart data={attentivenessData[selectedLecture] || []} />
        
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-color legend-high"></div>
            <span>High Attention (75%+)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color legend-medium"></div>
            <span>Moderate Attention (50-74%)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color legend-low"></div>
            <span>Low Attention (&lt;50%)</span>
          </div>
        </div>
      </div>

      {/* Today's Attendance Section - Full Width */}
      <div className="attendance-section-full">
        <h2 className="section-title">Today's Attendance</h2>
        
        {/* Attendance Circle */}
        <div className="attendance-circle-container">
          <div className="attendance-circle-wrapper">
            <svg className="attendance-circle-svg" viewBox="0 0 36 36">
              <path
                className="attendance-circle-bg"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="attendance-circle-fill"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${todayAttendance.attendanceRate}, 100`}
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="attendance-percentage">
              <span className="attendance-rate">{todayAttendance.attendanceRate}%</span>
            </div>
          </div>
          <p className="attendance-text">
            {todayAttendance.present} out of {todayAttendance.total} lectures attended
          </p>
        </div>

        {/* Missed Lectures */}
        {todayAttendance.missedLectures.length > 0 && (
          <div className="missed-lectures">
            <h4 className="missed-lectures-title">Missed Lectures:</h4>
            <ul className="missed-lectures-list">
              {todayAttendance.missedLectures.map((lecture, index) => (
                <li key={index}>• {lecture}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Attendance Status */}
        <div className={`attendance-status ${
          todayAttendance.attendanceRate >= 80 ? 'status-excellent' :
          todayAttendance.attendanceRate >= 60 ? 'status-good' :
          'status-needs-improvement'
        }`}>
          <p className="status-text">
            {todayAttendance.attendanceRate >= 80 ? 'Excellent Attendance!' :
             todayAttendance.attendanceRate >= 60 ? 'Good Attendance' :
             'Needs Improvement'}
          </p>
        </div>
      </div>

      {/* Areas of Weakness Section */}
      <div className="weakness-section">
        <h2 className="weakness-title">
          ⚠️ Areas for Improvement (AI Analysis)
        </h2>
        
        {weaknessAreas[selectedLecture] && weaknessAreas[selectedLecture].length > 0 ? (
          <div className="weakness-grid">
            {weaknessAreas[selectedLecture].map((area, index) => (
              <div key={index} className={`weakness-card ${
                area.severity === 'High' ? 'severity-high' :
                area.severity === 'Medium' ? 'severity-medium' :
                'severity-low'
              }`}>
                <div className="weakness-header">
                  <h3 className="weakness-topic">{area.topic}</h3>
                  <span className={`severity-badge ${
                    area.severity === 'High' ? 'badge-high' :
                    area.severity === 'Medium' ? 'badge-medium' :
                    'badge-low'
                  }`}>
                    {area.severity}
                  </span>
                </div>
                <p className="weakness-time">
                  🕐 Low attention during: {area.timeInterval}
                </p>
                <div className="weakness-footer">
                  <span className="confidence-text">
                    AI Confidence: {area.confidence}%
                  </span>
                  <button className="resources-button">
                    View Resources →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-weakness">
            <div className="no-weakness-icon">✅</div>
            <p className="no-weakness-text">No significant areas of weakness detected in this lecture!</p>
            <p className="no-weakness-subtext">Keep up the great work!</p>
          </div>
        )}
      </div>

      {/* Recommendations Section */}
      <div className="recommendations-section">
        
        {/* Study Recommendations */}
        <div className="recommendations-card">
          <h3 className="recommendations-title">
            💡 Study Recommendations
          </h3>
          <ul className="recommendations-list">
            <li className="recommendation-item">
              <span className="recommendation-arrow">→</span>
              <span className="recommendation-text">Review Quadratic Equations concepts during 30-40 min break intervals</span>
            </li>
            <li className="recommendation-item">
              <span className="recommendation-arrow">→</span>
              <span className="recommendation-text">Practice factorization problems for 15 minutes daily</span>
            </li>
            <li className="recommendation-item">
              <span className="recommendation-arrow">→</span>
              <span className="recommendation-text">Take short breaks every 30 minutes during study sessions</span>
            </li>
          </ul>
        </div>

        {/* Performance Trends */}
        <div className="trends-card">
          <h3 className="trends-title">
            📈 Performance Trends
          </h3>
          <div className="trends-list">
            <div className="trend-item">
              <span className="trend-label">Average Attention</span>
              <span className="trend-value trend-positive">+5% this week</span>
            </div>
            <div className="trend-item">
              <span className="trend-label">Attendance Rate</span>
              <span className="trend-value trend-neutral">83% this month</span>
            </div>
            <div className="trend-item">
              <span className="trend-label">Weakness Areas</span>
              <span className="trend-value trend-warning">2 identified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;