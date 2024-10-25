import { useState, useEffect } from 'react';
import './Form3.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Form3 = () =>{
  const navigate = useNavigate();
  const location = useLocation(); 

  const userId = location.state.userId;

  const [userJob, setUserJob] = useState({
    jobTitle: '',
    companyName: '',
    startDate: '',
    endDate: '',
    jobDescription: '',
  });

  useEffect (() =>{
    const fetchUserJob = async () => {
        try {
          const response = await fetch(`http://localhost:3000/users/${userId}`);
          if (!response.ok) {
            throw new Error('User not found');
          }
          const userData = await response.json();
  
          if (userData.job && userData.job.length > 0) {
            const userJob = userData.job[0]; 
            setUserJob(userJob);
          }
        } catch (error) {
          console.error(`Error fetching education data: ${error.message}`);
        }
      };
  
      fetchUserJob();
     }, [userId]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserJob({ ...userJob, [name]: value });
     };

     const handleSubmit = async () => {
        try {
            const userResponse = await fetch(`http://localhost:3000/users/${userId}`);
            if (!userResponse.ok) {
                throw new Error('Error fetching existing user data');
            }
            const existingUserData = await userResponse.json();
    
            const updatedUserData = {
                ...existingUserData,
                job: [userJob], 
            };
    
            const response = await fetch(`http://localhost:3000/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUserData), 
            });
    
            if (!response.ok) {
                throw new Error('Error updating user education');
            }
    
            navigate(`/cv`, { state: { userId: userId } });
        } catch (error) {
            console.error(`Error saving education data: ${error.message}`);
        }
    };

    const handleBack = () => {
        navigate('/personal-info2', { state: { userId: userId } });
      };

      
    return(
        <>
        <div className="form-page">
        <nav>
            <h1>1</h1>
            <h1>2</h1>
            <h1 className='current-page'>3</h1>
        </nav>

        <h2>Occupation Details</h2>

        <div className="form">
            <div className="form-body">
            <label>Job Title</label>
            <input type="text" placeholder="Job Title" name="jobTitle" value={userJob.jobTitle} onChange={handleInputChange}/>

            <label>Company Name</label>
            <input type="text" placeholder="Company Name" name="companyName" value={userJob.companyName} onChange={handleInputChange}/>

            <label>Start Date</label>
            <input type="date" name="startDate" value={userJob.startDate} onChange={handleInputChange}/>

            <label>End Date</label>
            <input type="date" name="endDate" value={userJob.endDate} onChange={handleInputChange}/>

            <label className='job-desc'>Job Description</label>
            <textarea placeholder="Describe your responsibilities" name="jobDescription" value={userJob.jobDescription} onChange={handleInputChange}></textarea>
            </div>
            <div className='button-container'>
            <button onClick={handleBack}>Back</button>
            <button onClick={handleSubmit}>Continue</button>
            </div>
        </div>
        </div>
        </>
    );
}

export default Form3;