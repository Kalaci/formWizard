import './CvList.css'; 
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const CvList = () => {
  const [cvList, setCvList] = useState([]);
  const [filteredCvs, setFilteredCvs] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  useEffect(() => {
    const fetchCvs = async () => {
      try {
        const response = await fetch('http://localhost:3000/users'); 
        if (!response.ok) {
          throw new Error('Failed to fetch CVs');
        }
        const data = await response.json();
        setCvList(data);
        setFilteredCvs(data);
      } catch (error) {
        console.error(`Error fetching CVs: ${error.message}`);
      }
    };

    fetchCvs();
  }, []);


  const handleSearch = (e) => {
    const searchValue = e.target.value;

    setSearchParams({
        search: searchValue,
    });
};

    useEffect(() => {
    const searchQuery = searchParams.get('search') || "";
    
    const filtered = cvList.filter(cv =>
      `${cv.name} ${cv.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredCvs(filtered); 
  }, [searchParams, cvList]);

  const clearFilter = ()=>{
    setSearchParams({});

  }
  
  const cvView = (id) =>{
    navigate(`/cv`, { state: { userId: id } });
  }


  return (
    <>
    <nav className="homepage-nav2">
      <Link to="/"><h2>Create CV</h2></Link>
      <h2>CV List</h2>
    </nav>
    <div className='main-list-body'>
      <h1>CV List</h1>
      <input placeholder='Enter name' onChange={handleSearch}></input>
      <div className="cv-list-container">
      {filteredCvs.length > 0 ? (
            <ul>
              {filteredCvs.map(cv => (
                <li key={cv.id} className="cv-item" onClick={() => cvView(cv.id)}>
                  <h2>{cv.name} {cv.lastName}</h2>
                  <p><strong>Email:</strong> {cv.email}</p>
                  <p><strong>Phone:</strong> {cv.phone}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No CVs available.</p>
          )}
      </div>
      <button onClick={clearFilter}>Clear Filter</button>
      </div>
    </>
  );
};

export default CvList;
