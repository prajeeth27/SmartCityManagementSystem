// src/pages/Dashboard/index.jsx

import React from 'react';
import './styles.css';
import IssueForm from '../../components/IssueForm';
import ViewIssues from './ViewIssues';
import UpdateIssueStatus from './UpdateIssueStatus';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <h1>City Dashboard</h1>
            <p>
                View and manage city services, events, and issues from one place.
            </p>
            {/* Issue Reporting Form */}
            <div className="issue-form-section">
                <IssueForm />
            </div>
            {/* View Issues */}
            <div className="view-issues-section">
                <ViewIssues />
            </div>
            {/* Update Issue Status */}
            <div className="update-issue-status-section">
                <UpdateIssueStatus />
            </div>
        </div>
    );
}

export default Dashboard;
