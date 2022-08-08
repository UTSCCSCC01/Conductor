import React from 'react';
import { useNavigate } from 'react-router-dom';
// Components
import SmallHeader from '../../Header/SmallHeader';
import BlueButton from '../../Button/BlueButton';
// Style
import '../CalendarPage.css';

function ActiveJobs({ bodyData }) {
    const navigate = useNavigate();
    
    const onView = (jobName) => {
        if (!jobName) return;
        navigate(`/dashboard/calendar/jobs/${jobName.replace(/\s+/g, '-').toLowerCase()}`);
    };

    const onJobs = () => {
        navigate("/dashboard/calendar/jobs");
    };

    const jobList = bodyData 
        ? bodyData.map((job, index) => {
            return (
                <div key={index} className="job-event">
                    <div className="job-description">
                        <div className="job-title">
                            <h4>{job.name ? job.name : "Undefined"}</h4>
                            <p>{job.date ? job.date : "No time"}</p>
                        </div>
                        <div className="job-status">
                            <p>Status: {job.status ? job.status : "Inactive"}</p>
                            <p>Connected Bots: {job.bots ? job.bots.length : "0"}</p>
                        </div>
                    </div>
                    <BlueButton text="View" onButton={() => onView(job.name)} />
                </div>
            );
        })
        : <div className="date-event none">No Event</div>;

    return (
        <div className="active-jobs">
            <SmallHeader title="Active Jobs" buttonName2="View All" onButton={onJobs} />
            <div className="jobs-list">{jobList}</div>
        </div>
    );
}

export default ActiveJobs;