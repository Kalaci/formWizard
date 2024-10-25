import './Cv.css';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Cv = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const [userData, setUserData] = useState(null);

    const userId = location.state.userId;
    
    useEffect(()=>{
        const fetchUserData = async() =>{
            try{
                const response = await fetch(`http://localhost:3000/users/${userId}`);
                if(!response.ok){
                    throw new Error('User not found');
                }
                const data = await response.json();
                setUserData(data);
            }catch(error){
                console.error(`Error fetching user data: ${error.message}`);
            }
        };
        
        fetchUserData();
    }, [userId]);

    if (!userData) {
        return <div>Loading...</div>; 
    }

    const handleBack = () => {
        navigate('/personal-info3', { state: { userId: userId } });
    }

    const handleSubmit = () => {
        navigate('/');
    }

    return(
        <>
            <div className="cv-page">
                <h1>Curriculum Vitae</h1>
                <div className='form'>
                    <section className="pers-info" onClick={()=>{navigate('/personal-info', { state: { userId: userId }})}}>
                        <h2>Personal Information</h2>
                        <p><strong>Name:</strong> {userData.name} {userData.lastName}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>Phone:</strong> {userData.phone}</p>
                        <p><strong>Address:</strong> {userData.address}</p>
                        <p><strong>birthday:</strong> {userData.birthday}</p>

                    </section>

                    <section className="edu-info" onClick={()=>{navigate('/personal-info2', { state: { userId: userId }})}}>
                        <h2>Education</h2>
                        {userData.education.length > 0 ? (
                            userData.education.map((edu, index) => (
                                <div key={index}>
                                    <p><strong>Degree:</strong> {edu.degree}</p>
                                    <p><strong>University:</strong> {edu.university}</p>
                                    <p><strong>Years:</strong> {edu.startYear} - {edu.finishYear}</p>
                                </div>
                            ))
                        ) : (
                            <p>No education information provided.</p>
                        )}
                    </section>
                    
                    <section className="job-info" onClick={()=>{navigate('/personal-info3', { state: { userId: userId }})}}>
                        <h2>Job Experience</h2>
                        {userData.job.length > 0 ? (
                            userData.job.map((job, index) => (
                                <div key={index}>
                                    <p><strong>Job Title:</strong> {job.jobTitle}</p>
                                    <p><strong>Company:</strong> {job.companyName}</p>
                                    <p><strong>Years:</strong> {job.startDate} - {job.endDate}</p>
                                    <p><strong>Description:</strong> {job.jobDescription}</p>
                                </div>
                            ))
                        ) : (
                            <p>No job information provided.</p>
                        )}
                    </section>
                </div>

                <div className='button-container'>
                    <button onClick={handleBack}>Back</button>
                    <button onClick={handleSubmit}>Finished</button>
                </div>
            </div>
        </>
    );
}

export default Cv;
