import React from 'react';
import { LineWave } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white-200 bg-opacity-75 z-50 flex items-center justify-center">
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



