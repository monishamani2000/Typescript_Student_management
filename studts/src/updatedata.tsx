import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './form.css';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
// import Pocketbase from 'pocketbase';

interface Student {
  fullname: string;
  age: string;
  email: string;
  mobilenumber: string;
  gender: string;
  faculty: string;
  department: string;
  checkbox: string;
}


export function UpdateData() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

//   const [errorMessage, setErrorMessage] = useState<string>();
  const navigate = useNavigate();
  const { id } = useParams();

  const [student, setStudent] = useState<Student>({
    fullname: '',
    age: '',
    email: '',
    mobilenumber: '',
    gender: '',
    faculty: '',
    department: '',
    checkbox: ''
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8090/api/collections/students/records/${id}`
        );
        setStudent(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

  const handleInput = (value: Partial<Student>) => {
    setStudent((prevStudent) => {
      return { ...prevStudent, ...value };
    });
  };

  const updateRecord = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8090/api/collections/students/records/${id}`,
        student
      );
      console.log(response.data);
      if (response) {
        setStudent({
          fullname: '',
          age: '',
          email: '',
          mobilenumber: '',
          gender: '',
          faculty: '',
          department: '',
          checkbox: ''
        });
      }
      console.log(response);
      reset();
      navigate('/table');
    } catch (errors) {
      console.log(errors);
    
    }
  };

  return (
    <>
      <form action="" className="formleft" onSubmit={handleSubmit(updateRecord)}>
        <div className="container1">
          <div className="container2">
            <div className="head">
              <div className="symbol">
                <div className="one"></div>
                <div className="one"></div>
                <div className="one"></div>
              </div>
              <h2 className="headcar">Cario University</h2>
            </div>
            <div className="regi_div">
              <h3 className="reg">Update Form</h3>
              <div className="main">
                <div className="left">
                  <h3 className="h3">Personal Information</h3>
                  <div className="formleft">
                    <div className="full">
                      <label>Fullname :</label>
                      <input type="text"{...register('fullname')} name="fullname" className="inputfn"  value={student.fullname} onChange={(e) => handleInput({ fullname: e.target.value })} id="fullname"/>
                      {/* <p className="redpara">{errors.fullname?.message}</p> */}
                    </div>
                    <div className="gender">
                      <span>Gender :</span>
                      <div className="list">
                        <label className="">Male</label>
                        <input type="radio" {...register('gender')}  value={'male'} onChange={(e) => handleInput({ gender: e.target.value })} id="gender"/>

                        {/* <p className="redpara">{errors.gender?.message}</p> */}
                      </div>
                      <div className="list">
                        <label>Female</label>
                        <input type="radio"  className="female"{...register('gender')} value={'female'} onChange={(e) => handleInput({ gender: e.target.value })} id="gender" />
                      </div>
                    </div>
                    <div className="full">
                      <label>Age :</label>
                      <input type="text" {...register('age')} value={student.age} onChange={(e) => handleInput({ age: e.target.value })} id="age" name="age" className="inputfn"/>
                      {/* <p className="redpara">{errors.age?.message}</p> */}
                    </div>
                    <h3 className="h3">University Details</h3>
                    <div className="full">
                      <label>Faculty :</label>
                      <select id="" className="sel1" {...register('faculty')} value={student.faculty} onChange={(e) => handleInput({ faculty: e.target.value })}>
                        <option>select</option>
                        <option>Student</option>
                        <option>Trainer</option>
                        <option>Principal</option>
                      </select>
                      {/* <p className="redpara">{errors.faculty?.message}</p> */}
                    </div>
                    <div className="full">
                      <label>Department :</label>
                      <select id="" className="sel1" {...register('department')} value={student.department} onChange={(e) => handleInput({ department: e.target.value })}>
                        <option>select</option>
                        <option>Computer</option>
                        <option>Medical</option>
                        <option>Civil</option>
                      </select>
                      {/* <p className="redpara">{errors.department?.message}</p> */}
                    </div>
                  </div>
                </div>
                <div className="right">
                  <h3 className="h3">Contact Information</h3>
                  <div className="formleft">
                    <div className="full">
                      <label>Email :</label>
                      <input type="text" className="inputfn" {...register('email')} value={student.email} onChange={(e) => handleInput({ email: e.target.value })}/>
                      {/* <p className="redpara">{errors.email?.message}</p> */}
                    </div>
                    <div className="full">
                      <label>Mobile Number :</label>
                      <input type="text" className="inputfn"{...register('mobilenumber')} value={student.mobilenumber} onChange={(e) => handleInput({ mobilenumber: e.target.value })}/>
                      {/* <p className="redpara">{errors.mobilenumber?.message}</p> */}
                    </div>
                    <h3 className="h3">Career Counseling Service</h3>
                    <div className="line">
                      <p>
                        Career counseling is a 45 minute free service provided by Cario University
                        to advice students on the best career choices.{' '}
                      </p>
                    </div>
                    <div className="last">
                      <input type="checkbox" className="check" {...register('checkbox')} value={student.checkbox} onChange={(e) => handleInput({ checkbox: e.target.value })}/>
                      <h4 className="h4">I want to book the career counseling session</h4>
                    </div>
                    {/* <p className="redpara">{errors.checkbox?.message}</p> */}
                    <div className="butt">
                      <button className="sub">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
