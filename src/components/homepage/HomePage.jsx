import { Link } from "react-router-dom";
import "./homepage.css";

const HomePage = () => {
  return (
    <>
    <nav className="homepage-nav">
      <h2>Create CV</h2>
      <Link to="/cv-list"><h2>CV List</h2></Link>
    </nav>
    <div className="home-page">
      <h1>Create your CV now</h1>
      <Link to="/personal-info">
        <button>Create</button>
      </Link>
    </div>
    </>
  );
};

export default HomePage;
