import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

function Array({ array }) {
  return (
    <div className='w-full flex justify-between mt-5  h-full space-x-2'>
      {array.map((arr, i) => (
        <div
          style={{ height: `${arr}%` }}
          key={i}
          className={clsx(
            'bg-red-200 flex justify-center',
            array.length > 45 && 'w-2'
          )}
        >
          {array.length < 45 && arr}
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  const [array, setArray] = useState([1, 2, 8, 4, 3, 2, 7, 5, 3, 21]);
  const [length, setLength] = useState(50);

  function randomArray() {
    const ARRAY_LENGTH = length;
    const tempArr = [];
    for (let i = 0; i < ARRAY_LENGTH; i++) {
      tempArr.push(Math.floor(Math.random() * 50) + 10);
    }

    setArray(tempArr);
  }

  function handleSlider(value) {
    setLength(value);
  }

  return (
    <div>
      <div className='mt-5 flex items-center justify-between  rounded'>
        <div className='flex items-center space-x-5'>
          <div
            onClick={randomArray}
            className='bg-orange-500 rounded-lg px-6 py-2 cursor-pointer italic'
          >
            Randomise Array
          </div>
          <div>
            <label className='flex flex-col items-center justify-center'>
              Length of Array
              <input
                onChange={(e) => handleSlider(e.target.value)}
                type='range'
                min='0'
                max='100'
                defaultValue='50'
              />
            </label>
          </div>
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
