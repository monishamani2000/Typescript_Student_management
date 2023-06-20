import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { MyForm } from './form';
import { Table } from './table';
import { UpdateData } from './updatedata';


function App() {

  return (
    <>
    <BrowserRouter>
       <Routes>
          <Route path='/' element={<MyForm/>}></Route>
          <Route path='/table' element={<Table/>}></Route>
          <Route path='/:id' element={<UpdateData/>}></Route>
       </Routes>
      </BrowserRouter>
      

      
      
    </>
  )
}

export default App
