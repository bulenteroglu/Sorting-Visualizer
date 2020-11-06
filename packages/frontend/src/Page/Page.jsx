import React, { useEffect, useState } from 'react';

function Array({ array }) {
  return (
    <div className='w-full flex justify-between mt-5 px-20 h-full space-x-2'>
      {array.map((arr, i) => (
        <div
          style={{ height: `${arr}%` }}
          key={i}
          className='w-12 bg-red-200 flex justify-center'
        >
          {arr}
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  const [array, setArray] = useState([1, 2, 8, 4, 3, 2, 7, 5, 3, 21]);

  function randomArray() {
    const ARRAY_LENGTH = 10;
    const tempArr = [];
    for (let i = 0; i < ARRAY_LENGTH; i++) {
      tempArr.push(Math.floor(Math.random() * 50) + 10);
    }

    setArray(tempArr);
  }

  return (
    <div>
      <div className='mt-5 flex items-center justify-between text-white rounded'>
        <div
          onClick={randomArray}
          className='bg-orange-500 rounded-lg px-6 py-2 cursor-pointer italic'
        >
          Randomise Array
        </div>
        <div>
          <ul className='flex space-x-12'>
            <li className='bg-indigo-500 rounded-lg px-6 py-2 cursor-pointer'>
              Bubble Sort
            </li>
          </ul>
        </div>
      </div>
      <Array array={array} />
    </div>
  );
}
