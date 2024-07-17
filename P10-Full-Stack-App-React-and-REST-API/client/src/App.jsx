//import React from 'react';
import { Route, Routes } from "react-router-dom";

import Header from './components/Header.jsx';
import Courses from './components/Courses.jsx';
import CourseDetail from './components/CourseDetail.jsx';
import UpdateCourse from './components/UpdateCourse.jsx';
import CreateCourse from './components/CreateCourse.jsx';
import UserSignIn from './components/UserSignIn.jsx';
import UserSignUp from './components/UserSignUp.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import NotFound from './components/NotFound.jsx';
import Forbidden from './components/Forbidden.jsx';
import UnhandledError from './components/UnhandledError.jsx';


// Sets routes for all fields
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route element={<PrivateRoute />} >
          <Route path="/courses/:id/update" element={<UpdateCourse />} />
          <Route path="/courses/create" element={<CreateCourse />} />
        </Route>
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/error" element={<UnhandledError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
