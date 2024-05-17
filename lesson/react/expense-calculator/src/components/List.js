import React, { useState } from 'react'

const List = ({ setName, setCost, expenseData, setExpenseData, setEditData, amount, setAmount }) => {
    

    const editExpense = (expenseData) => {
        console.log('editExpense');
        setName(expenseData.expenseName);
        setCost(expenseData.expenseCost);
        setEditData(expenseData);
    }

    const deleteExpense = (deleteData) => {
        const newExpenseData = expenseData.filter((data) => data.id != deleteData.id);
        setAmount(Number(amount) - Number(deleteData.expenseCost));
        setExpenseData(newExpenseData);
    }
        return (
          <div className='my-4'>
              {expenseData.map((data) => (
                  <div key={data.id}>
                      <span>{data.expenseName}</span>
                      <span className='mx-4'>{data.expenseCost}</span>
                      <button className='border mx-2' onClick={() => editExpense(data)}>수정</button>
                      <button className='border mx-2' onClick={() => deleteExpense(data)}>삭제</button>
                  </div>
              ))}
          </div>
        )
}

export default List