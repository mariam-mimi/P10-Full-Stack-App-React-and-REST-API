import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from '../context/UserContext';
import ErrorsDisplay from './ErrorsDisplay';

// Creates new courses
const CreateCourse = () => {
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const courseTitle = useRef(null);
  const courseDescription = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Creates a new course object
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
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Basic ${encodedCredentials}`
      },
      body: JSON.stringify(course),
    }
    // the post request
    try {
      const response = await fetch('https://full-stack-react-app-production-13be.up.railway.app/api/courses', fetchOptions);
      if (response.status === 201) {
        console.log('course created successfully');
        navigate("/");
      } else if (response.status === 400) {
        const data = await response.json();
        setErrors(data.errors);
      }
    } catch(error) {
      console.log('Error:', error);
      // shows error when issue creating a course
      navigate('/error');
    }
  }

  // Allows the course being created to get cancelled
  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  }

  return (
    <main>
        <div className="wrap">
            <h2>Create Course</h2>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" ref={courseTitle} />

                        <p>By {authUser ? authUser.firstName : ''} {authUser ? authUser.lastName : ''}</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription" ref={courseDescription}></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTime} />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded}></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Create Course</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    </main>
  )
}

export default CreateCourse