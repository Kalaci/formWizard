import './CvList.css'; 
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const CvList = () => {
  const [cvList, setCvList] = useState([]);
  const [filteredCvs, setFilteredCvs] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");

  const navigate = useNavigate();
  
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

  useEffect(() => {
    fetchCvs(); 
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchInput(searchValue);
    setSearchParams({
      search: searchValue,
      sort: sortOrder,
    });
  };

  const handleSortChange = (e) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
    setSearchParams({
      search: searchInput,
      sort: newSortOrder,
    });
  };

  useEffect(() => {
    let filtered = cvList;

    const searchQuery = searchParams.get('search') || "";
    const sortQuery = searchParams.get('sort') || "latest";

    if (searchQuery) {
      filtered = filtered.filter(cv =>
        `${cv.name} ${cv.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortQuery === 'latest') {
      filtered = [...filtered].sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated));
    } else if (sortQuery === 'earliest') {
      filtered = [...filtered].sort((a, b) => new Date(a.timeCreated) - new Date(b.timeCreated));
    }


    setFilteredCvs(filtered);
  }, [searchParams, cvList]);

  const clearFilter = () => {
    setSearchParams({});
    setSearchInput("");
    setSortOrder("latest");
  };
  
  const cvView = (id) => {
    navigate(`/cv`, { state: { userId: id } });
  };

  const deleteCv = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchCvs(); 
      } else {
        throw new Error('Failed to delete CV');
      }
    } catch (error) {
      console.error(`Error deleting CV: ${error.message}`);
    }
  };

  return (
    <>
      <nav className="homepage-nav2">
        <Link to="/"><h2>Create CV</h2></Link>
        <h2>CV List</h2>
      </nav>
      <div className='main-list-body'>
        <h1>CV List</h1>
        <div className='filtering-section'>
          <input 
            placeholder='Enter name' 
            onChange={handleSearch} 
            value={searchInput}
          />
          <select onChange={handleSortChange} value={sortOrder}>
            <option value="latest">Latest</option>
            <option value="earliest">Earliest</option>
          </select>
        </div>
        <div className="cv-list-container">
          {filteredCvs.length > 0 ? (
            <ul>
              {filteredCvs.map(cv => (
                <li key={cv.id} className="cv-item">
                  <div className="cv-item-head">
                    <div className="cv-name" onClick={() => cvView(cv.id)}>
                      <h2>{cv.name} {cv.lastName}</h2>
                    </div>
                    <h2 id="delete" onClick={() => deleteCv(cv.id)}>X</h2>
                  </div>
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
