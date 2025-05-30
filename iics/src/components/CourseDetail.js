import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';



const CourseDetail = () => {

  const params = useParams();
  const [course, setCourse] = useState({});
  const [studentList, setStudentList] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    getCoursesDetail()
  }, [])

  const getCoursesDetail = () => {
    axios.get('http://localhost:4200/course/course-detail/' + params.id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        console.log('result data = ', res.data)
        setCourse(res.data.course)
        setStudentList(res.data.studentList)
      })
      .catch(err => {
        console.log(err)
        toast.error('somethins is wrong....')
      })
  }

  const deleteCourse = (courseId)=>{
    if(window.confirm('are you sure you want to delete ?')){
      axios.delete('http://localhost:4200/course/'+ courseId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(res => {
          console.log('result data = ', res.data)
          navigate('/dashboard/course')
        })
        .catch(err => {
          console.log(err)
          toast.error('somethins is wrong....')
        })
    }
  }
  return (
    <div className='course-detail-main-wrapper'>
      {
        course &&
        <div>
          <div className="course-detail-wrapper">
            <img className='course-detail-thumbnail' src={course.imageUrl} alt="couse-image" />
            <div className='course-detail-text'>
              <h1>{course.courseName}</h1>
              <p>Price :-{course.price}</p>
              <p>Starting Date :-{course.startingDate}</p>
              <p>End Date :-{course.endDate}</p>
            </div>
            <div className='course-description-box'>
              <div className='btn-container'>
                <button onClick={() => { navigate('/dashboard/update-course/' + course._id, { state: { course } }) }} className='primary-btn btn'>Edit</button>
                <button  onClick={()=>{deleteCourse(course._id)}} className='secondary-btn btn'>Delete</button>
                
              </div>
              <h3>Course Description</h3>
              <div className='course-description-container'>
                <p>{course.description}</p>
              </div>
            </div>
          </div>
        </div>
      }

      {studentList && studentList.length > 0 &&
        <div className="studentList-container">
          <table> 
            <thead>
              <tr>
                <th>Student's profile</th>
                <th>Student's Name</th>
                <th>Phone No</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {
                studentList.map((student) => (
                    <tr onClick={() => { navigate('/dashboard/student-detail/' + student._id) }} className='student-row' key={student._id}>
                      <td><img className='student-profile-pic' src={student.imageUrl} alt="student-image" /></td>
                      <td><p>{student.fullName}</p></td>
                      <td><p>{student.phone}</p></td>
                      <td><p>{student.email}</p></td>
                    </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  )
}

export default CourseDetail;
