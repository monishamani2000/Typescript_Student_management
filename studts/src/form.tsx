import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  fullname: string;
  age: number;
  mobilenumber: number;
  email: string;
  gender: string;
  faculty: string;
  department: string;
  checkbox: boolean;
}

const dataCheck = yup.object().shape({
  fullname: yup.string().required('Enter the name!'),
  age: yup.number().required('Enter the Age!'),
  mobilenumber: yup.number().required('Enter your Number!'),
  email: yup.string().email().required('Enter correct mail!'),
  gender: yup.string().required('Select one field!'),
  faculty: yup.string().required('Select the field!'),
  department: yup.string().required('Please select the field!'),
  checkbox: yup.boolean().oneOf([true], 'Click the checkbox!'),
});

export function MyForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: yupResolver(dataCheck) });

  const handleRegistration = async (data: FormValues) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8090/api/collections/students/records',
        data
      );

      if (response.status === 201) {
        console.log('Registration successful');
      } else {
        console.log('Registration failed');
      }

      console.log(response.data);
      reset();
      navigate('/table');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="formleft" onSubmit={handleSubmit(handleRegistration)}>
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
              <h3 className="reg">Registration Form</h3>
              <div className="main">
                <div className="left">
                  <h3 className="h3">Personal Information</h3>
                  <div className="formleft">
                    <div className="full">
                      <label>Fullname :</label>
                      <input
                        type="text"
                        {...register('fullname')}
                        name="fullname"
                        className="inputfn"
                      />
                      <p className="redpara">{errors.fullname?.message}</p>
                    </div>
                    <div className="gender">
                      <span>Gender :</span>
                      <div className="list">
                        <label className="">Male</label>
                        <input
                          type="radio"
                          {...register('gender')}
                          value="male"
                        />
                        <p className="redpara">{errors.gender?.message}</p>
                      </div>
                      <div className="list">
                        <label>Female</label>
                        <input
                          type="radio"
                          className="female"
                          {...register('gender')}
                          value="female"
                        />
                      </div>
                    </div>
                    <div className="full">
                      <label>Age :</label>
                      <input
                        type="text"
                        {...register('age')}
                        name="age"
                        className="inputfn"
                      />
                      <p className="redpara">{errors.age?.message}</p>
                    </div>
                    <h3 className="h3">University Details</h3>
                    <div className="full">
                      <label>Faculty :</label>
                      <select
                        id=""
                        className="sel1"
                        {...register('faculty')}
                      >
                        <option>select</option>
                        <option>Student</option>
                        <option>Trainer</option>
                        <option>Principal</option>
                      </select>
                      <p className="redpara">{errors.faculty?.message}</p>
                    </div>
                    <div className="full">
                      <label>Department :</label>
                      <select
                        id=""
                        className="sel1"
                        {...register('department')}
                      >
                        <option>select</option>
                        <option>Computer</option>
                        <option>Medical</option>
                        <option>Civil</option>
                      </select>
                      <p className="redpara">{errors.department?.message}</p>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <h3 className="h3">Contact Information</h3>
                  <div className="formleft">
                    <div className="full">
                      <label>Email :</label>
                      <input
                        type="text"  className="inputfn"
                        {...register('email')}
                      />
                      <p className="redpara">{errors.email?.message}</p>
                    </div>
                    <div className="full">
                      <label>Mobile Number :</label>
                      <input
                        type="text"
                        className="inputfn"
                        {...register('mobilenumber')}
                      />
                      <p className="redpara">{errors.mobilenumber?.message}</p>
                    </div>
                    <h3 className="h3">Career Counseling Service</h3>
                    <div className="line">
                      <p>
                        Career counseling is a 45 minute free service provided by Cario University
                        to advice students on the best career choices.
                      </p>
                    </div>
                    <div className="last">
                      <input
                        type="checkbox"
                        className="check"
                        {...register('checkbox')}
                      />
                      <h4 className="h4">I want to book the career counseling session</h4>
                    </div>
                    <p className="redpara">{errors.checkbox?.message}</p>
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
