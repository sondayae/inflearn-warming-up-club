'use client'
import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import quizs from './quiz';

interface answerType {
  answer: any,
}

const quizPage = () => {

  const [score, setScore] = useState(0);
  const { register, handleSubmit } = useForm();
  const onValid = (data: any) => {
    const answers = data;
    Object.entries(answers).map((answer) => {
      if (answer[1] === 'true') {
        setScore(prev => prev + 1);
      }
    });
  };

  return (
    <div>
    <form onSubmit={handleSubmit(onValid)}>
      {
        quizs.map((quiz: any) => {
          return (
            <div key={quiz.id} className='quiz'>
              <span>{quiz.question} ?</span>
              <div className='answer'>
              {
                quiz.answers.map((answer: any, idx: string) => {
                  return (
                    <div key={`${quiz.id}_${idx}`}>
                      <input {...register(`${quiz.id}`)}  type='radio' value={answer.correct} />{answer.text}
                    </div>
                  )
                })
              }
              </div>
            </div>
          )
        })
      }
      <input type='submit' className='submitBtn'></input>
    </form>
    <span className={score == 0 ? 'hide' : ''}>{score} 개 맞췄습니다.</span>
    </div>
  )
}

export default quizPage;