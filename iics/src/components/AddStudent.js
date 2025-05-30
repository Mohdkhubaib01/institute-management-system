import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [courseId, setCourseId] = useState('');
  const [image, setImage] = useState('');

  const [imageUrl, setimageUrl] = useState('');
  const [isLoading, setLoading] = useState('');


  const [courseList, setCourseList] = useState([]);
  const location = useLocation()

  const navigate = useNavigate();

  useEffect(() => {
    getCourses();
    if (location.state) {
      setFullName(location.state.student.fullName)
      setPhone(location.state.student.phone)
      setEmail(location.state.student.email)
      setAddress(location.state.student.address)
      setCourseId(location.state.student.courseId)
      setimageUrl(location.state.student.imageUrl)
    }
    else {
      setFullName('')
      setPhone('')
      setEmail('')
      setAddress('')
      setCourseId('')
      setimageUrl('')
    }
  }, [location])

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

  const submitHandler = (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('phone', phone)
    formData.append('email', email)
    formData.append('address', address)
    formData.append('courseId', courseId);
    if (image) {
      formData.append('image', image)
    }

    if(location.state){
      axios.put('http://localhost:4200/student/'+location.state.student._id, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(res => {
          setLoading(false)
          console.log(res.data)
          toast.success('Successfully Updated About Student..')
  
          navigate('/dashboard/student-detail/'+location.state.student._id)
        })
        .catch(err => {
          setLoading(false)
          console.log(err)
          toast.error('somthing is wrong..')
        })
    }
    else{
      axios.post('http://localhost:4200/student/add-student', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(res => {
          setLoading(false)
          console.log(res.data)
          toast.success('new student  added..')
  
          navigate('/dashboard/course-detail/'+courseId)
        })
        .catch(err => {
          setLoading(false)
          console.log(err)
          toast.error('somthing is wrong..')
        })
    }


  }


  const fileHandler = (e) => {
    setImage(e.target.files[0])
    setimageUrl(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <div>
      <form onSubmit={submitHandler} className='form'>
        <h1>{location.state ? 'Edit Student Detail' : 'Add New Student'}</h1>
        <input value={fullName} onChange={(e) => { setFullName(e.target.value) }} type="text" placeholder='Student name' />
        <input value={phone} onChange={(e) => { setPhone(e.target.value) }} type="text" placeholder='Phone Number' />
        <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="text" placeholder='Email' />
        <input value={address} onChange={(e) => { setAddress(e.target.value) }} type="text" placeholder='Full Address' />
        <select disabled={location.state} value={courseId} onChange={(e) => { setCourseId(e.target.value) }} >
          <option value=''>Select Course</option>
          {
            courseList.map((course) => (
              <option key={course._id} value={course._id}>{course.courseName}</option>
            ))
          }
        </select>
        <input required={!location.state} onChange={fileHandler} type="file" />
        {imageUrl && <img className='your-logo' src={imageUrl} alt="student picture" />}
        <button type='submit' className='submit-btn'>{isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}submit</button>


      </form>
    </div>

  )
}

export default AddStudent;