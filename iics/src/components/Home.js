import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

const Home = () => {

  const [totalCourse,setTotalCourse] = useState(0);
  const [totalStudent,setTotalStudent] = useState(0);
  const [totalAmount,setTotalAmount] = useState(0);
  const [Students,setStudents] = useState([]);
  const [fees,setFees] = useState([]);

  const navigate = useNavigate()



  useEffect(()=>{
    getHomeDetails()
  },[])

  const getHomeDetails = ()=>{

    axios.get('http://localhost:4200/course/home/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        console.log('result data = ', res.data)
        setTotalCourse(res.data.totalCourse)
        setTotalStudent(res.data.totalStudent)
        setStudents(res.data.students)
        setFees(res.data.fees)
        setTotalAmount(res.data.totalAmount)
      })
      .catch(err => {
        console.log(err)
        toast.error('somethins is wrong....')
      })
  }

  return (
    <div className='home-wrapper'>
    <div className="count-box-wrapper">
      <div className="box1 box">
        <h2>{totalCourse}</h2>
        <p>Total Course</p>
      </div>
      <div className="box2 box">
        <h2>{totalStudent}</h2>
        <p>Students</p>
      </div>
      <div className="box3 box">
      <h2>Rs {totalAmount}</h2>
        <p>Toatal Amount</p>
      </div>
    </div>
    <div className="list-container">
      <div className="table-container">
        {
          Students.length>0 
          ?
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
                Students.map((student) => (
                    <tr className='student-row' key={student._id}>
                      <td><img className='student-profile-pic' src={student.imageUrl} alt="student-image" /></td>
                      <td><p>{student.fullName}</p></td>
                      <td><p>{student.phone}</p></td>
                      <td><p>{student.email}</p></td>
                    </tr>
                ))
              }
            </tbody>
          </table>
          :
          <p>No students is here</p>

        }
      
      </div>
      <div className="table-container">
        {
          fees.length>0 
          ?
          <table>
        <thead>
          <tr>
          <th>Student's Name</th>
          <th>Date and Time</th>
          <th>Amount</th>
          <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          {
            fees.map((payment)=>(
              <tr key={payment._id}>
                <td>{payment.fullName}</td>
                <td>{payment.createdAt}</td>
                <td>{payment.amount}</td>
                <td>{payment.remark}</td>
              </tr>
            ))
          }       
        </tbody>
      </table>
      :
    <p>No Payment History is here</p>

        }
      
      </div>
    </div>
    </div>
  )
}

export default Home