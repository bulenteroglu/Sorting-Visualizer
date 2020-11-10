import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { sleep } from '../helper/sleep';

function Array({ array, currentIdx, CurrentIdx1, pointerLeft, pointerRight }) {
  const [mouseEnter, setMouseEnter] = useState(false);

  return (
    <div className={clsx('w-full flex mt-5 h-full space-x-1')}>
      {array.map((arr, i) => (
        <div
          onMouseEnter={() => setMouseEnter(true)}
          onMouseLeave={() => setMouseEnter(false)}
          style={{ height: `${arr}%` }}
          key={i}
          className={clsx(
            'rounded-b-full text-xs text-white flex justify-center w-16 bg-gradient-to-b hover:from-blue-800 hover:to-blue-900 transition duration-75 transform hover:scale-110',
            currentIdx === i ? 'bg-green-400' : 'bg-gray-800',
            pointerLeft === i && 'bg-purple-500',
            pointerRight === i && 'bg-blue-500',
            CurrentIdx1 === i ? 'bg-red-600' : 'bg-gray-800',
            array.length > 45 && 'w-4'
          )}
        >
          {array.length < 51 && arr}
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(50);
  const [currentIdx, setCurrentIdx] = useState(null);
  const [CurrentIdx1, setCurrentIdx1] = useState(null);
  const [sortActive, setSortActive] = useState(false);

  const [pointerLeft, setPointerLeft] = useState(null);
  const [pointerRight, setPointerRight] = useState(null);

  const [target, setTarget] = useState(10);

  useEffect(() => {
    randomArray(50);
  }, []);

  function randomArray(length) {
    // const ARRAY_LENGTH = length;

    // let array = new Set();
    // while (array.size !== ARRAY_LENGTH) {
    //   array.add(Math.floor(Math.random() * 100) + 1);
    // }

    // setArray([...array]);
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

  async function bubbleSort() {
    setSortActive(true);
    let isSorted = false;
    let counter = 0;

    while (!isSorted) {
      isSorted = true;
      for (let i = 0; i < array.length - 1 - counter; i++) {
        setCurrentIdx(i);
        await sleep(speed);
        if (array[i] > array[i + 1]) {
          let temp = array[i + 1];
          array[i + 1] = array[i];
          array[i] = temp;
          setCurrentIdx1(i + 1);
          isSorted = false;
        }
      }
      counter++;
    }
    setCurrentIdx(null);
    setCurrentIdx1(null);

    setArray([...array]);
    setSortActive(false);
  }

  async function insertionSort(array) {
    setSortActive(true);
    for (let i = 1; i < array.length; i++) {
      let j = i;
      while (j > 0 && array[j] < array[j - 1]) {
        await sleep(speed);

        setCurrentIdx(j);
        setCurrentIdx1(j - 1);
        const temp = array[j - 1];
        array[j - 1] = array[j];
        array[j] = temp;
        j -= 1;
      }
    }
    setCurrentIdx(null);
    setCurrentIdx1(null);

    setArray([...array]);
    setSortActive(false);
  }

  async function selectionSort(array) {
    setSortActive(true);
    let startIdx = 0;
    while (startIdx < array.length - 1) {
      let smallestIdx = startIdx;

      for (let i = startIdx + 1; i < array.length; i++) {
        setCurrentIdx(i);
        await sleep(speed);

        if (array[smallestIdx] > array[i]) {
          setCurrentIdx1(smallestIdx);
          smallestIdx = i;
        }
      }
      const temp = array[smallestIdx];
      array[smallestIdx] = array[startIdx];
      array[startIdx] = temp;
      startIdx++;
    }
    setCurrentIdx(null);
    setCurrentIdx1(null);
    setArray([...array]);
    setSortActive(false);
  }

  async function binarySearch() {
    sortArrayHelper(array);

    let left = 0;
    let right = array.length - 1;

    setPointerRight(array.length - 1);
    setPointerLeft(left);

    console.log(array);
    while (left <= right) {
      await sleep(3000);
      const middle = Math.floor((left + right) / 2);
      const potentialMatch = array[middle];

      if (potentialMatch === target) {
        setCurrentIdx(middle);
        setPointerRight(null);
        setPointerLeft(null);
        return middle;
      } else if (target < potentialMatch) {
        right = middle - 1;
        setPointerRight(right);
        console.log('RIGHT INDEX: ' + right);
      } else {
        left = middle + 1;
        setPointerLeft(left);
        console.log('LEFT INDEX: ' + left);
      }
    }

    setTimeout(() => {
      setCurrentIdx(null);
      setPointerRight(null);
      setPointerLeft(null);
    }, 1000);

    return -1;
  }

  function sortArrayHelper(array) {
    array.sort((a, b) => a - b);
  }

  function handleChange(value) {
    setTarget(value);
  }

  return (
    <div className='h-screen'>
      <div className='mt-5 flex items-center justify-between  rounded'>
        <div className='flex items-center space-x-5 text-white'>
          <div>
            <label className='flex flex-col items-center justify-center italic'>
              Length of Array
              <input
                className='mt-3 rounded-lg overflow-hidden appearance-none bg-gray-800 h-3 focus:outline-none py-2 '
                onChange={(e) => handleSlider(e.target.value)}
                type='range'
                min='20'
                max='150'
                defaultValue='50'
              />
            </label>
          </div>
          <div>
            <label className='flex flex-col items-center justify-center italic'>
              Speed
              <input
                className='mt-3 rounded-lg overflow-hidden appearance-none bg-gray-800 h-3 focus:outline-none py-2 transform rotate-180'
                onChange={(e) => setSpeed(e.target.value)}
                type='range'
                min='0'
                max='500'
                step='50'
                defaultValue='250'
              />
            </label>
          </div>
        </div>
        <div>
          <ul className='flex space-x-6'>
            {/* <div className='space-y-2 flex flex-col items-center justify-center'>
              <button
                disabled={sortActive}
                onClick={() => binarySearch()}
                className={clsx(
                  'bg-orange-500 rounded-lg px-6 py-2 cursor-pointer focus:outline-none',
                  sortActive &&
                    'text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed'
                )}
              >
                Binary Search
              </button>
              <input
                className='bg-gray-200 rounded px-3 py-1 focus:outline-none border border-black'
                type='text'
                placeholder='enter something'
                value={target}
                onChange={(e) => handleChange(e.target.value)}
              />
            </div> */}
            <button
              disabled={sortActive}
              onClick={() => bubbleSort(array)}
              className={clsx(
                'bg-indigo-800 font-bold italic text-white rounded-lg px-6 py-2 cursor-pointer transition duration-75 ease-in focus:outline-none hover:bg-indigo-700 focus:bg-indigo-600',
                sortActive && 'text-white opacity-50 cursor-not-allowed'
              )}
            >
              Bubble Sort
            </button>
            <button
              disabled={sortActive}
              onClick={() => insertionSort(array)}
              className={clsx(
                'bg-indigo-800 font-bold italic text-white rounded-lg px-6 py-2 cursor-pointer transition duration-75 ease-in focus:outline-none hover:bg-indigo-700 focus:bg-indigo-600',
                sortActive && 'text-white opacity-50 cursor-not-allowed'
              )}
            >
              Insertion Sort
            </button>
            <button
              disabled={sortActive}
              onClick={() => selectionSort(array)}
              className={clsx(
                'bg-indigo-800 font-bold italic text-white rounded-lg px-6 py-2 cursor-pointer transition duration-75 ease-in focus:outline-none hover:bg-indigo-700 focus:bg-indigo-600',
                sortActive && 'opacity-50 cursor-not-allowed'
              )}
            >
              Selection Sort
            </button>
          </ul>
        </div>
      </div>
      <Array
        array={array}
        currentIdx={currentIdx}
        CurrentIdx1={CurrentIdx1}
        pointerLeft={pointerLeft}
        pointerRight={pointerRight}
      />
    </div>
  );
}
