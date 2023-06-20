import { useEffect, useState } from 'react';
import './table.css';
import axios from 'axios';
import PocketBase from 'pocketbase';
import { Link, useNavigate } from 'react-router-dom';

interface Student {
  id: number;
  fullname: string;
  gender: string;
  age: number;
  faculty: string;
  department: string;
  email: string;
  mobilenumber: string;
}

const pb = new PocketBase('http://127.0.0.1:8090');

export function Table() {
  const [inputvalue, setInputvalue] = useState<Student[]>([]);
  const navigate = useNavigate();

  // calling the API in pocket base
  const fetchValue = async () => {
    try {
      const res = await axios.get<Student[]>('http://127.0.0.1:8090/api/collections/students/records');
      setInputvalue(res.data);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchValue();
  }, []);

  const deleteValue = async (recordId: number) => {
    try {
      await pb.collection('students').delete(recordId);
      console.log('Record deleted');
      window.location.reload();
    } catch (error) {
      console.error('Error delete:', error);
    }
  };

  const handleForm = () => {
    navigate('/');
  };

  return (
    <>
      <div className="first">
        <table border={2} className='tableside'>
          <thead>
            <tr>
              <th className='heading'>Fullname</th>
              <th className='heading'>Gender</th>
              <th className='heading'>Age</th>
              <th className='heading'>Faculty</th>
              <th className='heading'>Department</th>
              <th className='heading'>Email</th>
              <th className='heading'>Mobile No</th>
            </tr>
          </thead>
          <tbody>
            {inputvalue.map((item) => (
              <tr key={item.id}>
                <td>{item.fullname}</td>
                <td>{item.gender}</td>
                <td>{item.age}</td>
                <td>{item.faculty}</td>
                <td>{item.department}</td>
                <td>{item.email}</td>
                <td>{item.mobilenumber}</td>
                <td>
                  <Link to={`/${item.id}`}>
                    <button>Update</button>
                  </Link>
                </td>
                <td>
                  <button onClick={() => deleteValue(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleForm} className='gobut'>
          Go-Back
        </button>
      </div>
    </>
  );
}
