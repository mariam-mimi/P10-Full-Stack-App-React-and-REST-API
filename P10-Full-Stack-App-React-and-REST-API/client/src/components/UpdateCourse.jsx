import { useContext, useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import UserContext from '../context/UserContext';
import ErrorsDisplay from './ErrorsDisplay';

const UpdateCourse = () => {
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);
  const [errors, setErrors] = useState([]);
  let { id } = useParams()

  // gets the data of the courses
  useEffect(() => {
    fetch(`https://full-stack-react-app-production-13be.up.railway.app/api/courses/${id}`)
      .then(response => response.json())
      .then(data => setCourse(data))
      .catch(error => {
        console.error('Error:', error)
        //shows error when issue fetching data
        navigate('/error');
      }); 
  }, []);

  const courseTitle = useRef();
  const courseDescription = useRef();
  const estimatedTime = useRef();
  const materialsNeeded = useRef();

  // This works to update a course
  const handleSubmit = async (e) => {
    e.preventDefault();
    // works to create a new course object
    const course = {
      title: courseTitle.current.value,
      description: courseDescription.current.value,
      estimatedTime: estimatedTime.current.value,
      materialsNeeded: materialsNeeded.current.value,
      userId: authUser.id
    };

    const encodedCredentials = btoa(`${authUser.email}:${authUser.password}`);
    // Different options for a post request 
    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Basic ${encodedCredentials}`
      },
      body: JSON.stringify(course),
    }
    // the post request
    try {
      const response = await fetch(`https://full-stack-react-app-production-13be.up.railway.app/api/courses/${id}`, fetchOptions);
      if (response.status === 204) {
        console.log('course updated successfully');
        navigate(`/courses/${id}`);
      } else if (response.status === 400) {
        const data = await response.json();
        setErrors(data.errors);
      }
    } catch(error) {
      console.log('Error:', error);
      //shows error when issue updating a course
      navigate('/error');
    }
  }

  // allows to cancel a course update
  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  }

  // If the course requested from the REST API is not found, direct users to the path /notfound
  if (!course) {
    navigate('/notfound');
    // If user is unauthenticated, it directs users to the path /notfound
  } else if (authUser && authUser.id !== course.userId) {
    navigate('/forbidden');
  } else {
    // renders the page for course updates
    return (
      <main>
        <div className="wrap">
            <h2>Update Course</h2>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" defaultValue={course.title} ref={courseTitle}/>

                        <p>By Joe Smith</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription" defaultValue={course.description} ref={courseDescription}></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={course.estimatedTime} ref={estimatedTime}/>

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={course.materialsNeeded} ref={materialsNeeded}></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Update Course</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    </main>
    )
  }
}

export default UpdateCourse