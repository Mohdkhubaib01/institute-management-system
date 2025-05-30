import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
const StudentDetail = () => {
  const [student, setStudent] = useState({})
  const [paymentList, setPaymentList] = useState([]);
  const [course,setCourse] = useState({})

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getStudentDetail();
  }, [])



  const getStudentDetail = () => {
    axios.get('http://localhost:4200/student/student-detail/' + params.id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        console.log('result data = ', res.data)
        setStudent(res.data.studentDetail)
        setPaymentList(res.data.feeDetail)
        setCourse(res.data.courseDetail)
      })
      .catch(err => {
        console.log(err)
        toast.error('somethins is wrong....')
      })
  }

  const deleteStudent = (studentId)=>{
    if(window.confirm('are you sure you want to delete ?')){
      axios.delete('http://localhost:4200/student/'+ studentId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(res => {
          console.log('result data = ', res.data)
          navigate('/dashboard/course-detail/'+course._id)
          toast.success("Student data is deleted")
        })
        .catch(err => {
          console.log(err)
          toast.error('somethins is wrong....')
        })
    }
  }

  return (
    <div className='student-detail-main-wrapper'>
      <div className="student-detail-wrapper">
        <div className='student-detail-header'>
          <h2>Student Full Detail</h2>
          <div className='st-btn-container'>
            <button className='primary-btn btn' onClick={() => { navigate('/dashboard/update-student/' + student._id, { state: { student } }) }}>Edit</button>
            <button onClick={()=>{deleteStudent(student._id)}} className='secondary-btn btn'>Delete</button>
          </div>
        </div>
        <div className="sd-detail">
          <img src={student.imageUrl} alt="student-image" />
          <div>
            <h2>{student.fullName}</h2>
            <p><b>Phone: </b>{student.phone}</p>
            <p><b>Email: </b>{student.email}</p>
            <p><b>Address: </b>{student.address}</p>
            <p><b>Course Name: </b>{course.courseName}</p>
          </div>
        </div>
      </div>
      <br />
      <h2 className='payment-history-title'>Payment History</h2>
      <div className="fee-detail-wrapper">
      <table>
        <thead>
          <th>Date and Time</th>
          <th>Amount</th>
          <th>Remark</th>
        </thead>
        <tbody>
          {
            paymentList.map((payment)=>(
              <tr key={payment._id}>
                <td>{payment.createdAt}</td>
                <td>{payment.amount}</td>
                <td>{payment.remark}</td>
              </tr>
            ))
          }       
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default StudentDetail;