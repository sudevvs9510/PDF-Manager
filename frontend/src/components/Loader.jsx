import React from 'react';
import { LineWave } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <LineWave
        visible={true}
        height="200"
        width="200"
        color="#6D28D9 "
        ariaLabel="line-wave-loading"
        wrapperStyle={{}}
        wrapperClass=""
        firstLineColor=""
        middleLineColor=""
        lastLineColor=""
        />
    </div>
  );
};

export default Loader;



