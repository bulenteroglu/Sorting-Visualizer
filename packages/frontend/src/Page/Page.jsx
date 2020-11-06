import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

const ANIMATION_SPEED_MS = 1000;

function Array({ array }) {
  return (
    <div className={clsx('w-full flex  mt-5 h-full space-x-1')}>
      {array.map((arr, i) => (
        <div
          style={{ height: `${arr}%` }}
          key={i}
          className={clsx(
            'bg-red-200 text-xs flex justify-center w-12',
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

  function randomArray(length) {
    const ARRAY_LENGTH = length;
    const tempArr = [];
    for (let i = 0; i < ARRAY_LENGTH; i++) {
      tempArr.push(Math.floor(Math.random() * 50) + 10);
    }

    setArray(tempArr);
  }

  function handleSlider(value) {
    randomArray(value);
  }

  function bubbleSort(array) {
    let isSorted = false;
    let counter = 0;

    while (!isSorted) {
      isSorted = true;
      for (let i = 0; i < array.length - 1 - counter; i++) {
        if (array[i] > array[i + 1]) {
          let temp = array[i + 1];
          array[i + 1] = array[i];
          array[i] = temp;
          isSorted = false;
        }
      }
      counter++;
    }
    setArray([...array]);
  }

  return (
    <div>
      <div className='mt-5 flex items-center justify-between  rounded'>
        <div className='flex items-center space-x-5'>
          <div>
            <label className='flex flex-col items-center justify-center'>
              Length of Array
              <input
                onChange={(e) => handleSlider(e.target.value)}
                type='range'
                min='2'
                max='100'
                defaultValue='50'
              />
            </label>
          </div>
        </div>
        <div>
          <ul className='flex space-x-12'>
            <li
              onClick={() => bubbleSort(array)}
              className='bg-indigo-500 rounded-lg px-6 py-2 cursor-pointer'
            >
              Bubble Sort
            </li>
          </ul>
        </div>
      </div>
      <Array array={array} />
    </div>
  );
}
