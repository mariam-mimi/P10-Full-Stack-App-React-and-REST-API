import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // Gathers the list of courses
  useEffect(() => {
    fetch('https://full-stack-react-app-production-13be.up.railway.app/api/courses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => {
        console.error('Error:', error)
        // shows error when issue fetching data
        navigate('/error');
      }); 
  }, []);

  return (
    <div className="wrap main--grid">
      {courses.map(course => (
        <Link key={course.id} className="course--module course--link" to={"/courses/" + course.id}>
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
        </Link>
      ))}
        <Link className="course--module course--add--module" to="/courses/create">
            <span className="course--add--title">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                New Course
            </span>
        </Link>
    </div>
  )
}

export default Courses