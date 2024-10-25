import "./Form2.css";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';


const Form2 = () => {
  const navigate = useNavigate();
  const location = useLocation(); 

  const [education, setEducation] = useState({
    degree: '',
    university: '',
    startYear: '',
    finishYear: '',
  });

  const userId = location.state.userId; // Get user Id from prev page

  // Initial fetching for backtracking
  useEffect(() => {
    const fetchUserEducation = async () => {
        try {
          const response = await fetch(`http://localhost:3000/users/${userId}`);
          if (!response.ok) {
            throw new Error('User not found');
          }
          const userData = await response.json();
  
          if (userData.education && userData.education.length > 0) {
            const userEducation = userData.education[0]; 
            setEducation(userEducation);
          }
        } catch (error) {
          console.error(`Error fetching education data: ${error.message}`);
        }
      };
  
      fetchUserEducation();
    }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEducation({ ...education, [name]: value });
  };

  // Submitting data
  const handleSubmit = async () => {
    try {
        const userResponse = await fetch(`http://localhost:3000/users/${userId}`);
        if (!userResponse.ok) {
            throw new Error('Error fetching existing user data');
        }
        const existingUserData = await userResponse.json();

        // console.log(existingUserData);
        const updatedUserData = {
            ...existingUserData,
            education: [education], 
        };

        const response = await fetch(`http://localhost:3000/users/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUserData), 
        });

        if (!response.ok) {
            throw new Error('Error updating user education');
        }

        navigate(`/personal-info3`, { state: { userId: userId } });
    } catch (error) {
        console.error(`Error saving education data: ${error.message}`);
    }
};


  const handleBack = () => {
    navigate('/personal-info', { state: { userId: userId } });
  };

  return (
    <div className='form-page'>
        <nav>
        <h1>1</h1>
        <h1 className="current-page">2</h1>
        <h1>3</h1>
      </nav>

      <h2>Education Details</h2>

      <div className="form">
      <div className='form-body'>
        <label>Degree:</label>
        <input
          type="text"
          name="degree"
          value={education.degree}
          onChange={handleInputChange}
          placeholder="Degree"
        />

        <label>University:</label>
        <input
          type="text"
          name="university"
          value={education.university}
          onChange={handleInputChange}
          placeholder="University Name"
        />

        <label>Start Year:</label>
        <input
          type="number"
          name="startYear"
          value={education.startYear}
          onChange={handleInputChange}
          placeholder="Start Year"
        />

        <label>Finish Year:</label>
        <input
          type="number"
          name="finishYear"
          value={education.finishYear}
          onChange={handleInputChange}
          placeholder="Finish Year"
        />
      </div>
      <div className="button-container">
      <button onClick={handleBack}>Back</button>
      <button onClick={handleSubmit}>Continue</button>
      </div>
      </div>
    </div>
  );
};

export default Form2;
