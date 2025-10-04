'use client';

import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import GridComponent from './gridComponent.jsx';
useEffect(() => {
  // your chart initialization code
}, [chartRefs.distribution, chartRefs.monthly, chartRefs.subject, chartRefs.trend]);
// Fixed import path
import AttendanceControl from '../../components/AttendanceControl'; 

// Add this line:
console.log('AttendanceControl component:', AttendanceControl);
const Teachers = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [selectedClass, setSelectedClass] = useState('10A');
    const [selectedSubject, setSelectedSubject] = useState('math');
    const [attendanceStatus, setAttendanceStatus]  = useState('true');
    
    // States for face recognition integration - passed to AttendanceControl
    const [isAttendanceRunning, setIsAttendanceRunning] = useState(false);
    const [presentStudents, setPresentStudents] = useState([]);

    const chartRefs = {
        trend: useRef(null),
        subject: useRef(null),
        distribution: useRef(null),
        monthly: useRef(null),
    };
    
    // Chart rendering effect - unchanged
    useEffect(() => {
        const renderChart = (ref, data) => {
            if (ref.current) {
                if (ref.current.chart) {
                    ref.current.chart.destroy();
                }
                ref.current.chart = new Chart(ref.current, {
                    type: data.labels.length > 5 ? 'line' : 'bar', 
                    data: data,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                    },
                });
            }
        };
    
        if (activeSection === 'overview') {
            // Placeholder data defined inside the useEffect for Chart.js
            const trendData = {labels: ['0-10', '11-20', '21-30', '31-40',"41-50", "51-60", "60 +"], datasets: [{label: 'Att%', data: [85, 88, 92, 90,80,70,66,60], borderColor: '#4299e1', backgroundColor: 'rgba(66, 153, 225, 0.2)', tension: 0.4, fill: true, }],};
            const subjectData = {labels: ['Discrete Maths', 'Physics', 'Chemestry',"Physics","Field Project"], datasets: [{label: 'Avg Att', data: [92, 85, 88,33,50], backgroundColor: ['#4299e1', '#f6ad55', '#48bb78'],}],};
            renderChart(chartRefs.trend, trendData);
            renderChart(chartRefs.subject, subjectData);
        } else if (activeSection === 'reports') {
            const distributionData = {labels: ['Present', 'Absent'], datasets: [{data: [42, 3], backgroundColor: ['#48bb78', '#e53e3e'],}],};
            const monthlyTrendData = {labels: ['Jan', 'Feb', 'Mar'], datasets: [{label: 'Monthly Att %', data: [88, 90, 87], borderColor: '#4299e1', backgroundColor: 'rgba(66, 153, 225, 0.2)', tension: 0.4, fill: true, }],};
            renderChart(chartRefs.distribution, distributionData);
            renderChart(chartRefs.monthly, monthlyTrendData);
        }
    }, [activeSection]);

    const handleNavClick = (section) => {
        setActiveSection(section);
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'overview':
                return (
                    <section id="overview-section" className="content-section active p-6">
                        <div className="stats-grid grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                          <div className="stat-card bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
                            <div className="stat-icon text-4xl text-blue-500">
                              <i className="fas fa-users"></i>
                            </div>
                            <div className="stat-content">
                              <h3 className="text-3xl font-bold" id="totalStudents">45</h3>
                              <p className="text-gray-500 text-sm">Total Students</p>
                            </div>
                          </div>
                          <div className="stat-card bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
                            <div className="stat-icon text-4xl text-green-500">
                              <i className="fas fa-chart-line"></i>
                            </div>
                            <div className="stat-content">
                              <h3 className="text-3xl font-bold" id="avgAttendance">87%</h3>
                              <p className="text-gray-500 text-sm">Average Attendance</p>
                            </div>
                          </div>
                          <div className="stat-card bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
                            <div className="stat-icon text-4xl text-green-500">
                              <i className="fas fa-check-circle"></i>
                            </div>
                            <div className="stat-content">
                              <h3 className="text-3xl font-bold" id="presentToday">42</h3>
                              <p className="text-gray-500 text-sm">Present Today</p>
                            </div>
                          </div>
                          <div className="stat-card bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
                            <div className="stat-icon text-4xl text-red-500">
                              <i className="fas fa-times-circle"></i>
                            </div>
                            <div className="stat-content">
                              <h3 className="text-3xl font-bold" id="absentToday">3</h3>
                              <p className="text-gray-500 text-sm">Absent Today</p>
                            </div>
                          </div>
                        </div>
                        <div className="alerts-section bg-white rounded-lg shadow-md p-6 mb-8">
                          <h3 className="text-xl font-semibold mb-4 text-gray-800"><i className="fas fa-exclamation-triangle text-yellow-500 mr-2"></i> Quick Alerts</h3>
                          <div className="alerts-list text-gray-700" id="alertsList">
                            <p>No new alerts.</p>
                          </div>
                        </div>
                        <div className="charts-grid grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="chart-container bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-semibold mb-4 text-gray-800">Attentivenes in your lecture </h3>
                                <div style={{ height: '300px' }}>
                                    <canvas id="trendChart" ref={chartRefs.trend}></canvas>
                                </div>
                            </div>
                            <div className="chart-container bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-semibold mb-4 text-gray-800">Subject-wise Attendance</h3>
                                <div style={{ height: '300px' }}>
                                    <canvas id="subjectChart" ref={chartRefs.subject}></canvas>
                                </div>
                            </div>
                        </div>
                    </section>
                );
                case 'attendance':
                  return (
                      <section id="attendance-section" className="content-section p-6">
                          <h2 className="text-3xl font-bold mb-4 text-gray-800">Face Recognition Attendance</h2>
                          
                          {/* AttendanceControl component with required props */}
                          <AttendanceControl 
                              setIsAttendanceRunning={setIsAttendanceRunning}
                              setAttendanceStatus={setAttendanceStatus}
                              setPresentStudents={setPresentStudents}
                              isAttendanceRunning={isAttendanceRunning}
                              presentStudents={presentStudents}
                          />
                        
                        {/* Live/Last Session Status */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-3 text-gray-800">Attendance Session Results</h3>
                            <p className="text-gray-600 mb-4">Current Status: 
                                <span className={`font-bold ml-2 ${isAttendanceRunning ? 'text-yellow-600' : 'text-green-600'}`}>
                                    {attendanceStatus}
                                </span>
                            </p>
                            
                            {/* Students Present List */}
                            <h4 className="text-lg font-medium mb-2">Students Present ({presentStudents.length}):</h4>
                            {presentStudents.length > 0 ? (
                                <ul className="list-disc list-inside space-y-1 text-gray-700">
                                    {presentStudents.map((name, index) => (
                                        <li key={index} className="text-green-600 font-semibold">{name} - <span className="text-sm font-normal text-gray-500">Marked via Face Recognition</span></li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">Run the attendance session to see results here.</p>
                            )}
                        </div>
                    </section>
                );
            case 'reports':
                return (
                    <section id="reports-section" className="content-section p-6">
                        <div className="reports-header flex justify-between items-center mb-6">
                          <h2 className="text-2xl font-bold">Reports & Analytics</h2>
                          <div className="report-actions flex space-x-2">
                            <button className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors">
                              <i className="fas fa-file-excel mr-2"></i> Export Excel
                            </button>
                            <button className="btn bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition-colors">
                              <i className="fas fa-file-pdf mr-2"></i> Export PDF
                            </button>
                            <button className="btn bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full transition-colors">
                              <i className="fas fa-bell mr-2"></i> Send Alerts
                            </button>
                          </div>
                        </div>
                        <div className="reports-filters flex space-x-4 mb-6">
                          <div className="filter-group">
                            <label className="mr-2 text-gray-700">From Date:</label>
                            <input type="date" className="border border-gray-300 rounded-lg p-2" />
                          </div>
                          <div className="filter-group">
                            <label className="mr-2 text-gray-700">To Date:</label>
                            <input type="date" className="border border-gray-300 rounded-lg p-2" />
                          </div>
                          <div className="filter-group">
                            <label className="mr-2 text-gray-700">Report Type:</label>
                            <select className="border border-gray-300 rounded-lg p-2">
                              <option value="student">Student-wise</option>
                              <option value="subject">Subject-wise</option>
                              <option value="daily">Daily Summary</option>
                            </select>
                          </div>
                          <button className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors">Generate Report</button>
                        </div>
                        <div className="reports-content grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="chart-container bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Attendance Distribution</h3>
                            <div style={{ height: '300px' }}>
                              <canvas id="attendanceDistributionChart" ref={chartRefs.distribution}></canvas>
                            </div>
                          </div>
                          <div className="chart-container bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Monthly Trend</h3>
                            <div style={{ height: '300px' }}>
                              <canvas id="monthlyTrendChart" ref={chartRefs.monthly}></canvas>
                            </div>
                          </div>
                        </div>
                        <div className="defaulter-list bg-white rounded-lg shadow-md p-6">
                          <h3 className="text-xl font-semibold mb-4 text-gray-800"><i className="fas fa-exclamation-triangle text-red-500 mr-2"></i> Students Below 75% Attendance</h3>
                          <div className="defaulter-table-container overflow-hidden rounded-lg border border-gray-200">
                            <table className="defaulter-table min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No.</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance %</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Days</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present Days</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap">5</td>
                                  <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                                  <td className="px-6 py-4 whitespace-nowrap">72%</td>
                                  <td className="px-6 py-4 whitespace-nowrap">100</td>
                                  <td className="px-6 py-4 whitespace-nowrap">72</td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <button className="text-blue-600 hover:text-blue-900">Send Alert</button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                    </section>
                );
            case 'students':
                return (
                    <section id="students-section" className="content-section p-6">
                        <div className="students-header flex justify-between items-center mb-6">
                          <h2 className="text-2xl font-bold">Student Management</h2>
                          <button className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors">
                            <i className="fas fa-plus mr-2"></i> Add Student
                          </button>
                        </div>
                        <div className="students-table-container bg-white rounded-lg shadow-md overflow-hidden">
                          <table className="students-table min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No.</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance %</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Present</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap">1</td>
                                <td className="px-6 py-4 whitespace-nowrap">Viraj Sanjay Naik</td>
                                <td className="px-6 py-4 whitespace-nowrap">10A</td>
                                <td className="px-6 py-4 whitespace-nowrap">85%</td>
                                <td className="px-6 py-4 whitespace-nowrap">2023-10-25</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                                  <button className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                    </section>
                );
            case 'settings':
                return (
                    <section id="settings-section" className="content-section p-6">
                        <div className="settings-header mb-6">
                          <h2 className="text-2xl font-bold">Settings & Configuration</h2>
                        </div>
                        <div className="settings-content grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="settings-group bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Class & Subject Settings</h3>
                            <div className="setting-item mb-4">
                              <label className="block text-gray-700 font-medium mb-1">Default Class:</label>
                              <select className="w-full border border-gray-300 rounded-lg p-2">
                                <option value="10A">Class 10A</option>
                                <option value="10B">Class 10B</option>
                                <option value="11A">Class 11A</option>
                                <option value="11B">Class 11B</option>
                              </select>
                            </div>
                            <div className="setting-item mb-4">
                              <label className="block text-gray-700 font-medium mb-1">Default Subject:</label>
                              <select className="w-full border border-gray-300 rounded-lg p-2">
                                <option value="math">Mathematics</option>
                                <option value="science">Science</option>
                                <option value="english">English</option>
                                <option value="physics">Physics</option>
                                <option value="chemistry">Chemistry</option>
                              </select>
                            </div>
                          </div>
                          <div className="settings-group bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Notification Settings</h3>
                            <div className="setting-item mb-2">
                              <label className="flex items-center space-x-2 text-gray-700">
                                <input type="checkbox" className="form-checkbox" defaultChecked />
                                <span>Email Notifications</span>
                              </label>
                            </div>
                            <div className="setting-item mb-2">
                              <label className="flex items-center space-x-2 text-gray-700">
                                <input type="checkbox" className="form-checkbox" />
                                <span>SMS Notifications</span>
                              </label>
                            </div>
                            <div className="setting-item mb-2">
                              <label className="flex items-center space-x-2 text-gray-700">
                                <input type="checkbox" className="form-checkbox" />
                                <span>WhatsApp Notifications</span>
                              </label>
                            </div>
                          </div>
                          <div className="settings-group bg-white rounded-lg shadow-md p-6 col-span-1 md:col-span-2">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Attendance Threshold</h3>
                            <div className="setting-item">
                              <label className="block text-gray-700 font-medium mb-1">Minimum Attendance %:</label>
                              <input type="number" defaultValue="75" min="0" max="100" className="w-full border border-gray-300 rounded-lg p-2" />
                            </div>
                          </div>
                        </div>
                    </section>
                );
            default:
                return null;
        }
    };

    return (
        <div className="teachers-container flex h-screen bg-gray-100 font-sans">
            <style>{`
                /* Global styles */
                body {
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
                }

                /* Modal styles */
                .modal {
                    position: fixed;
                    z-index: 1000;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                    background-color: rgba(0,0,0,0.4);
                    display: none; /* Hidden by default */
                }
                .modal-content {
                    background-color: #fefefe;
                    margin: 15% auto;
                    padding: 20px;
                    border: 1px solid #888;
                    width: 80%;
                    max-width: 600px;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
                .close {
                    color: #aaa;
                    float: right;
                    font-size: 28px;
                    font-weight: bold;
                }
                .close:hover,
                .close:focus {
                    color: black;
                    text-decoration: none;
                    cursor: pointer;
                }
                
                .submit-button {
                    background-color: #3b82f6; /* bg-blue-500 */
                    color: white;
                    font-weight: bold;
                    padding: 0.5rem 1rem; /* py-2 px-4 */
                    border-radius: 9999px; /* rounded-full */
                    border: none;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                
                .submit-button:hover {
                    background-color: #2563eb; /* hover:bg-blue-700 */
                }
                .submit-button-container {
                    display: flex;
                    justify-content: center;
                }
            `}</style>
            
            {/* Sidebar Navigation */}
            <nav className="sidebar w-64 bg-gray-800 text-white p-6 shadow-lg hidden md:block">
                <div className="sidebar-header flex items-center mb-8">
                    <i className="fas fa-chalkboard-teacher text-2xl mr-3"></i>
                    <h2 className="text-2xl font-bold">Teacher teachers</h2>
                </div>
                <ul className="nav-menu space-y-2">
                    <li
                        className={`nav-item flex items-center p-3 rounded-lg cursor-pointer transition-colors ${activeSection === 'overview' ? 'bg-gray-700 text-blue-400' : 'hover:bg-gray-700'}`}
                        onClick={() => handleNavClick('overview')}
                    >
                        <i className="fas fa-tachometer-alt mr-4"></i>
                        <span>Overview</span>
                    </li>
                    <li
                        className={`nav-item flex items-center p-3 rounded-lg cursor-pointer transition-colors ${activeSection === 'attendance' ? 'bg-gray-700 text-blue-400' : 'hover:bg-gray-700'}`}
                        onClick={() => handleNavClick('attendance')}
                    >
                        <i className="fas fa-clipboard-check mr-4"></i>
                        <span>Mark Attendance</span>
                    </li>
                    <li
                        className={`nav-item flex items-center p-3 rounded-lg cursor-pointer transition-colors ${activeSection === 'reports' ? 'bg-gray-700 text-blue-400' : 'hover:bg-gray-700'}`}
                        onClick={() => handleNavClick('reports')}
                    >
                        <i className="fas fa-chart-bar mr-4"></i>
                        <span>Reports & Analytics</span>
                    </li>
                    <li
                        className={`nav-item flex items-center p-3 rounded-lg cursor-pointer transition-colors ${activeSection === 'students' ? 'bg-gray-700 text-blue-400' : 'hover:bg-gray-700'}`}
                        onClick={() => handleNavClick('students')}
                    >
                        <i className="fas fa-users mr-4"></i>
                        <span>Student Management</span>
                    </li>
                    <li
                        className={`nav-item flex items-center p-3 rounded-lg cursor-pointer transition-colors ${activeSection === 'settings' ? 'bg-gray-700 text-blue-400' : 'hover:bg-gray-700'}`}
                        onClick={() => handleNavClick('settings')}
                    >
                        <i className="fas fa-cog mr-4"></i>
                        <span>Settings</span>
                    </li>
                </ul>
            </nav>

            {/* Main Content Area */}
            <main className="main-content flex-1 overflow-y-auto bg-gray-100">
                {/* Header */}
                <header className="header flex justify-between items-center bg-white p-6 shadow-md">
                    <div className="header-left">
                        <h1 id="page-title" className="text-2xl font-bold text-gray-800">
                            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                        </h1>
                        <p id="page-subtitle" className="text-gray-500 text-sm">
                            Welcome to your teachers
                        </p>
                    </div>
                    <div className="header-right flex items-center space-x-4">
                        <div className="class-selector">
                            <select
                                id="classSelect"
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                className="border border-gray-300 rounded-lg p-2"
                            >
                                <option value="">Select Class</option>
                                <option value="10A">Class 10A</option>
                                <option value="10B">Class 10B</option>
                                <option value="11A">Class 11A</option>
                                <option value="11B">Class 11B</option>
                            </select>
                        </div>
                        <div className="subject-selector">
                            <select
                                id="subjectSelect"
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                className="border border-gray-300 rounded-lg p-2"
                            >
                                <option value="">Select Subject</option>
                                <option value="math">Mathematics</option>
                                <option value="science">Science</option>
                                <option value="english">English</option>
                                <option value="physics">Physics</option>
                                <option value="chemistry">Chemistry</option>
                            </select>
                        </div>
                        <div className="user-info flex items-center space-x-2 text-gray-700">
                            <i className="fas fa-user-circle text-2xl"></i>
                            <span>Jay Bhokare</span>
                            <div>
                                <GridComponent/>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Sections */}
                <div className="content p-6">
                    {renderSection()}
                </div>
            </main>
        </div>
    );
};

export default Teachers;