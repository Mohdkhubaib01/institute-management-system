import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const AddCourses = () => {
    const [courseName, setCourseName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [startingDate, setStartingDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [image, setImage] = useState(null);

    const [imageUrl, setimageUrl] = useState('');
    const [isLoading, setLoading] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log('hii')
        if (location.state) {
            console.log(location.state)
            setCourseName(location.state.course.courseName)
            setDescription(location.state.course.description)
            setPrice(location.state.course.price)
            setStartingDate(location.state.course.startingDate)
            setEndDate(location.state.course.endDate)
            setimageUrl(location.state.course.imageUrl)
        }
        else {
            setCourseName('')
            setDescription('')
            setPrice(0)
            setStartingDate('')
            setEndDate('')
            setimageUrl('')
        }
    }, [location])

    const submitHandler = (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData();
        formData.append('courseName', courseName)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('startingDate', startingDate)
        formData.append('endDate', endDate)
        if (image) {
            formData.append('image', image)
        }


        if (location.state) {
            axios.put('http://localhost:4200/course/' + location.state.course._id, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => {
                    setLoading(false)
                    console.log(res.data)
                    toast.success('Successfully Your Course Updated..')
                    navigate('/dashboard/course-detail/' + location.state.course._id)
                })
                .catch(err => {
                    setLoading(false)
                    console.log(err)
                    toast.error('somthing is wrong..')
                })
        }
        else {
            axios.post('http://localhost:4200/course/add-course', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => {
                    setLoading(false)
                    console.log(res.data)
                    toast.success('new couurse added..')

                    navigate('/dashboard/course')
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
                <h1>{location.state ? 'Edit course' : 'Add New Course'}</h1>
                <input value={courseName} required onChange={e => { setCourseName(e.target.value) }} type="text" placeholder='Course Name' />
                <input value={description} required onChange={e => { setDescription(e.target.value) }} type="text" placeholder='Description' />
                <input value={price} required onChange={e => { setPrice(e.target.value) }} type="Number" placeholder='Price' />
                <input value={startingDate} required onChange={e => { setStartingDate(e.target.value) }} type="text" placeholder='Starting Date (DD-MM-YY)' />
                <input value={endDate} required onChange={e => { setEndDate(e.target.value) }} type="text" placeholder='Ending Date (DD-MM-YY)' />
                <input required={!location.state} onChange={fileHandler} type="file" />
                {imageUrl && <img className='your-logo' src={imageUrl} alt="your logo" />}
                <button type='submit' className='submit-btn'>{isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}submit</button>


            </form>
        </div>

    )
}

export default AddCourses;