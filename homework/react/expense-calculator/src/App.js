import React, { useState } from 'react';
import './App.css';
import List from './components/List.js';

function App() {
  const [expenseData, setExpenseData] = useState([]);
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [editData, setEditData] = useState('');
  const [amount, setAmount] = useState(0);

  const handleNameChange = (event) => {
    setName(event.target.value);
  }
  const handleConstChange = (event) => {
    setCost(event.target.value);
  }

  const handleClick = (event) => {
    event.preventDefault();
    
    let newExpenseData = {
      id: Date.now(),
      expenseName: name,
      expenseCost: cost,
    };

    setExpenseData(prev => [...prev, newExpenseData]);
    setName('');
    setCost('');
    
    setAmount(Number(amount) + Number(cost));
  }

  const handleEdit = (event) => {
    event.preventDefault();

    setAmount(Number(amount) - Number(editData.expenseCost) + Number(cost));

    let newExpenseData = expenseData.map((data) => {
        if (data.id === editData.id) {
          data.expenseName = name;
          data.expenseCost = cost;
        }
        return data;
    });

    setExpenseData(newExpenseData);
    setEditData('');
    setName('');
    setCost('');
  }

  if (editData) {
    return (
      <div className="App flex flex-col items-center">
        <form>
          <span className='mx-2'>지출 항목</span>
          <input
            name='expenseName'
            value={name}
            placeholder='지출 항목을 입력하세요.'
            onChange={handleNameChange}
            className='border'
            />
          <span className='mx-2'>지출 금액</span>
          <input 
            name='expenseCost'
            value={cost}
            placeholder='지출 금액을 입력하세요.'
            onChange={handleConstChange}
            className='border'
          />
          <input
            type='submit'
            name='btn'
            value='수정'
            onClick={handleEdit}
            className='mx-2 border'
          />
        </form>
        <List setName={setName} setCost={setCost} expenseData={expenseData} setExpenseData={setExpenseData} setEditData={setEditData} amount={amount} setAmount={setAmount}/>
        <span>총 금액: {amount}</span>
      </div>
    );
  } else {
    return (
      <div className="App flex flex-col items-center">
        <form>
          <span className='mx-2'>지출 항목</span>
          <input
            name='expenseName'
            value={name}
            placeholder='지출 항목을 입력하세요.'
            onChange={handleNameChange}
            className='border'
            />
          <span className='mx-2'>지출 금액</span>
          <input 
            name='expenseCost'
            value={cost}
            placeholder='지출 금액을 입력하세요.'
            onChange={handleConstChange}
            className='border'
          />
          <input
            type='submit'
            name='btn'
            value='입력'
            onClick={handleClick}
            className='mx-2 border'
          />
        </form>
        <List setName={setName} setCost={setCost} expenseData={expenseData} setExpenseData={setExpenseData} setEditData={setEditData} amount={amount} setAmount={setAmount}/>
        <span>총 금액: {amount}</span>
      </div>
    );
  }

  
}

export default App;
