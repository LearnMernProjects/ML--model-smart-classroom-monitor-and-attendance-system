"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // <-- 🚨 New Required Import

const RoleSelectionPage = () => {
    // 🚨 Initialize the router hook
    const router = useRouter(); 
    
    const [selectedRole, setSelectedRole] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // ... (Your roles array remains the same)
    const roles = [
      { id: 'student', title: 'Student', icon: '🎓', image: '/student1.jpg', redirectUrl: 'http://localhost:3000/StudentYaTeacher', description: 'Access learning materials, assignments, and track your progress', styleClass: 'role-student-color' },
      { id: 'teacher', title: 'Teacher', icon: '👨‍🏫', image: '/teacher1.jpg', redirectUrl: 'http://localhost:3000/StudentYaTeacher/teachers', description: 'Create courses, manage students, and track their performance', styleClass: 'role-teacher-color' },
      { id: 'administrator', title: 'Administrator', icon: '👨‍💼', image: '/il.jpg', redirectUrl: 'http://localhost:3000/dashboard', description: 'Manage system settings, users, and oversee all activities', styleClass: 'role-admin-color' }
    ];

    const handleRoleSelect = (role) => {
        setSelectedRole(role.id);
    };

    const handleContinue = () => {
        const selected = roles.find(role => role.id === selectedRole);
        if (selected) {
            setIsLoading(true);
            localStorage.setItem('userRole', selectedRole);
            
            // 🚨 Use router.push() for reliable client-side navigation
            router.push(selected.redirectUrl);
        }
    };

    return (
        <div className="role-main-wrapper">
            <div className="role-selection-box">
                {/* Header */}
                <div className="role-header-container">
                    <div className="role-logo-circle">
                        <span>✨</span>
                    </div>
                    <h1 className="role-title">Welcome! Choose Your Role</h1>
                    <p className="role-subtitle">
                        Select your role to access the appropriate dashboard and features
                    </p>
                </div>

                {/* Role Cards */}
                <div className="role-cards-grid">
                    {roles.map((role) => (
                        <div
                            key={role.id}
                            onClick={() => handleRoleSelect(role)}
                            className={`role-card ${role.styleClass} ${selectedRole === role.id ? 'role-card-selected' : ''}`}
                        >
                            {/* Selection Indicator */}
                            {selectedRole === role.id && (
                                <div className="role-indicator-badge">
                                    <span>✓</span>
                                </div>
                            )}

                            {/* Role Icon & Title */}
                            <div className="role-icon-title">
                                <div className="role-icon">{role.icon}</div>
                                <h3 className="role-card-title">{role.title}</h3>
                            </div>

                            {/* Role Image */}
                            <div className="role-image-container">
                                <div className="role-image-circle">
                                    <img 
                                        src={role.image} 
                                        alt={role.title}
                                        className="role-image-img"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'block';
                                        }}
                                    />
                                    <div className="role-icon-fallback">{role.icon}</div>
                                </div>
                            </div>

                            {/* Role Description */}
                            <p className="role-description">
                                {role.description}
                            </p>

                            {/* Selection Overlay */}
                            <div className={`role-overlay ${selectedRole === role.id ? 'role-overlay-active' : ''}`} />
                        </div>
                    ))}
                </div>

                {/* Continue Button */}
                <div className="role-continue-center">
                    <button
                        onClick={handleContinue}
                        disabled={!selectedRole || isLoading}
                        className={`role-continue-btn ${selectedRole && !isLoading ? 'role-btn-active' : 'role-btn-disabled'}`}
                    >
                        {isLoading ? (
                            <>
                                <div className="role-spinner"></div>
                                Redirecting...
                            </>
                        ) : (
                            <>
                                Continue as {selectedRole ? roles.find(r => r.id === selectedRole)?.title : 'User'}
                                <span className="role-arrow">→</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Help Text */}
                <div className="role-help-text-center">
                    <p className="role-help-text">
                        Not sure which role to choose? Contact your administrator for guidance.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RoleSelectionPage;