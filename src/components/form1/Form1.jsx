import "./Form1.css";
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Form1 = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation(); 

  // Get userId from state if we're backtracking from other pages
  const [userId, setUserId] = useState(location.state?.userId || null);

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    birthday: '',
    education: [],
    job: [],
    timeCreated: '',
  });

  // Initial fetch in case of backtracking
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:3000/users/${userId}`)
        .then(response => response.json())
        .then(data => {
          if (data) {
            setFormData({
              name: data.name || '',
              lastName: data.lastName || '',
              email: data.email || '',
              phone: data.phone || '',
              address: data.address || '',
              birthday: data.birthday || '',
              education: data.education || [],
              job: data.job || [],
              timeCreated: data.timeCreated || '',
            });
          }
        })
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, [userId]);

  // Submitting data to backend for two cases: new & existing user 
  const handleSubmit = async () => {
    
    if (!userId) {
      const currentTime = new Date();
      console.log(currentTime);
      const formDataWithTime = {
        ...formData,
        timeCreated: currentTime,
      };
  
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formDataWithTime),
      });
      const data = await response.json();
      const newUserId = data.id;
      setUserId(newUserId);
      
      navigate(`/personal-info2`, { state: { userId: newUserId } });
    } else {
      await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      navigate(`/personal-info2`, { state: { userId: userId } });
    }
  };


  return (
    <div className="form-page">
      <nav>
        <h1 className="current-page">1</h1>
        <h1>2</h1>
        <h1>3</h1>
      </nav>
      <h2>User Information</h2>

      <div className='form'>
      <div className="form-body">
        <label>Enter Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
        />
        <label>Enter Last Name</label>
        <input
          type="text"
          value={formData.lastName}
          onChange={e => setFormData({ ...formData, lastName: e.target.value })}
          placeholder="Last Name"
        />
        <label>Enter Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          placeholder="test@email.com"
        />
        <label>Enter Phone Number</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={e => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+012 12 345 6789"
        />
        <label>Enter Address</label> {/* New Address Field */}
        <input
          type="text"
          value={formData.address}
          onChange={e => setFormData({ ...formData, address: e.target.value })}
          placeholder="Enter your address"
        />
        <label>Enter Birthday</label> {/* New Birthday Field */}
        <input
          type="date"
          value={formData.birthday}
          onChange={e => setFormData({ ...formData, birthday: e.target.value })}
        />
      </div>
      <button onClick={handleSubmit}>Continue</button>
      </div>
    </div>
  );
};

export default Form1;
