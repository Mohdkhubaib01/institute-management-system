import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';


const Courses = () => {
  const [courseList, setCourseList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCourses();
  }, [])

  const getCourses = () => {
    axios.get('http://localhost:4200/course/all-courses', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        console.log(res.data.courses)
        setCourseList(res.data.courses)
      })
      .catch(err => {
        console.log(err)
        toast.error('somethins is wrong....')
      })
  }
  return (
    <div className='course-wrapper'>
      {
        courseList.map((course) => (
          <div onClick={() => { navigate('/dashboard/course-detail/' + course._id) }} className='course-box' key={course._id}>
            <img className='course-thumbnail' src={course.imageUrl} alt="course-image" />
            <h4 className='course-title'>{course.courseName}</h4>
            <p className='course-price'>Rs <b>{course.price}</b> only</p>
          </div>
        ))
      }
    </div>
  )
}

export default Courses