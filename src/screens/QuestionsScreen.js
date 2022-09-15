import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const groupNameFormatter = (name) => {
  return name
    .split('-')
    .map((string) => string.charAt(0).toUpperCase() + string.slice(1))
    .join(' ');
};

const QuestionsScreen = () => {
  const [questions, setQuestions] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const { isLoading, error, questions } = useSelector(
  //   (store) => store.questions
  // );
  // console.log({ isLoading, error, questions });

  const [answers, setAnswers] = useState(
    Object.entries(questions)
      .flatMap(([_, questionsList]) => questionsList)
      .reduce((answers, acc) => ({ ...answers, [acc.id]: '' }), {})
  );

  console.log(answers);

  useEffect(() => {
    if (Object.keys(questions).length > 0) {
      let answerIdsObject = Object.entries(questions)
        .flatMap(([_, questionsList]) => questionsList)
        .reduce((answers, acc) => ({ ...answers, [acc.id]: '' }), {});
      setAnswers(answerIdsObject);
    }
  }, [Object.keys(questions).length]);

  const getQuestionsList = async ({ token, cookie }) => {
    const config = {
      method: 'get',
      url: 'http://172.105.60.26/api/v1/questions',
      headers: {
        Authorization: `Bearer ${token}`,
        // Cookie: `XSRF-TOKEN=${cookie}`,
      },
    };
    try {
      setIsLoading(true);
      const { data } = await axios(config);
      setQuestions(data);
      // const removed = 'prescription-and-lab-advice';
      // const { [removed]: remove, ...rest } = data;
      // setQuestions(rest);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(async () => {
    await getQuestionsList({
      token: '191|MJ6hvwefonXxMtX3PxT5fGCve277Ld629nF3LQbz',
      cookie:
        'eyJpdiI6IlIvejBTaEFzRTJ0NXI1ell6eUxSd1E9PSIsInZhbHVlIjoiYnd3YzM5dFVLWXd6SGNXdzJJNnhQZ2M2M0Z2ZFdtYkNtMHUyN3hGbitWK1dnVDV1d1hjaXl4bGhYM3BRQ215YXFuVEI2UDNBMDh0YWE2ZnpQM0VaZWpoOU5odWVCREhURmJHdmp0SVNnVE4rMlNDWUpzV053UjNmeXN5aEZrRkIiLCJtYWMiOiIyY2NjZTk2ZDMyMWExYjhlNzIwZGE2YjA0MTdlMTE1NTg1MzZkM2M3OWJkMDY2MDdlMzI0NGQ0YzlmMzljN2RjIiwidGFnIjoiIn0%3D; delher_session=eyJpdiI6Ik1zV2doUE92YUpIcjV5UVdLcWhGVEE9PSIsInZhbHVlIjoiWWN4NkRiQUtTTlVLSGtMRVovUUQ5R3d4RFBycFZyeTF0dVRFYUQzTWdTVTI3UkFOeVhzQzBxWVgwMzlyaXgwYWgwa3ZtZ2YwZjZ6WElLS285SVlsdncrYm4wYVV0YXBKVUZlVk13aEgyeSs1d0U0UmUrQk8rY2dvNXhLdVgzcXkiLCJtYWMiOiJiNDAyY2RlODUwODE5MDViZDc3YTYxM2RmNDViYWNkYjAwMTlkODc0ZjgxMzNhOWZkNTdjNGZiMTkzNDFkYTJlIiwidGFnIjoiIn0%3D',
    });
  }, []);

  // console.log(questions);

  const onValueChangeHandler = ({ target: { name, value } }) => {
    console.log({ name, value });
    setAnswers({ ...answers, [name]: value });
  };

  //   console.log(Object.entries(questions));
  return (
    <>
      {isLoading && <h6>Loading ...</h6>}
      {!isLoading && error && <h6>{error}</h6>}
      {Object.keys(questions).length > 0 &&
        Object.entries(questions).map(
          ([questionGroup, questionsList], index) => {
            return (
              <div key={index}>
                <h1 className='text-indigo-600 font-black text-2xl'>
                  {/* {questionGroup} */}
                  {groupNameFormatter(questionGroup)}
                </h1>
                {/* {questionsList?.map((question)=>{
                    return <span>{question?.options}</span>
                })} */}
                <ul className='list-disc'>
                  {questionsList?.length > 0 &&
                    questionsList?.map(
                      (
                        { question, options, id, has_multiple, is_seperate },
                        index
                      ) => {
                        return (
                          <li key={index}>
                            <span className='text-indigo-600 font-black text-2xl'>
                              {index + 1}
                            </span>{' '}
                            <span>{question}</span>{' '}
                            {/* <span>
                              {JSON.stringify({
                                id,
                                // has_multiple:
                                //   has_multiple === '0' ? false : true,
                                // is_seperate: is_seperate === '0' ? false : true,
                                has_multiple,
                                is_seperate,
                              })}
                            </span>{' '} */}
                            {/* {options?.length > 0 &&
                              options?.map((option, index) => (
                                <span>
                                  {JSON.stringify(
                                    option?.options?.length > 0 ? true : false
                                  )}
                                </span>
                              ))} */}
                            {is_seperate === '1' ? (
                              <input
                                type={'text'}
                                placeholder={`Enter ${question}`}
                                id={id}
                              />
                            ) : options?.length > 0 ? (
                              <>
                                {Object.keys(answers).length > 0 && (
                                  <span
                                    className='p-4'
                                    onChange={onValueChangeHandler}
                                  >
                                    {options?.map((option, index) => {
                                      console.log(
                                        Object.keys(answers).length > 0 && id,
                                        answers[id],
                                        answers[question?.id] === option?.id,
                                        answers[question?.id],
                                        option?.id
                                      );
                                      return (
                                        <>
                                          <input
                                            type='radio'
                                            id={`radio-${option?.id}`}
                                            className='accent-indigo-600'
                                            value={option?.id}
                                            name={id}
                                            checked={answers[id] === option?.id}
                                          />{' '}
                                          <label
                                            htmlFor={`radio-${option?.id}`}
                                          >
                                            {option?.question}
                                          </label>
                                        </>
                                      );
                                    })}
                                  </span>
                                )}

                                {/* <select
                                  id={id}
                                  // onChange={(event) =>
                                  //   changeFruit(event.target.value)
                                  // }
                                  // value={currentFruit}
                                >
                                  {options?.map((option, index) => {
                                    return (
                                      <option
                                        key={index + 1}
                                        value={option?.id}
                                      >
                                        {option?.id} {option?.question}
                                      </option>
                                    );
                                  })}
                                </select> */}
                              </>
                            ) : (
                              <input
                                type={'text'}
                                placeholder={`Enter ${question}`}
                              />
                            )}
                          </li>
                        );
                      }
                    )}
                </ul>
              </div>
            );
          }
        )}
    </>
  );
};

export default QuestionsScreen;
