import React, { useEffect, useState } from "react";

function Array() {
  const [temp, setTemp] = useState([2, 3, 5, 6]);

  useEffect(() => {
    var randoms = [...Array(4)].map(() => Math.floor(Math.random() * 9));
    setTemp(randoms);
  }, []);

  return (
    <div className='w-full flex justify-between mt-5 px-20 h-full space-x-2'>
      {temp.map((arr, i) => (
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
  return (
    <div>
      <div className='mt-5 flex items-center justify-between text-white rounded'>
        <div className='bg-orange-500 rounded-lg px-6 py-2 cursor-pointer italic'>
          Randomise Array
        </div>
        <div>
          <ul className='flex space-x-12'>
            <li
              onClick={() => {}}
              className='bg-indigo-500 rounded-lg px-6 py-2 cursor-pointer'
            >
              Bubble Sort
            </li>
          </ul>
        </div>
      </div>
      <Array />
    </div>
  );
}
