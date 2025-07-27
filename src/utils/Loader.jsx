import React from 'react'
import'./Loader.css'
const Loader = () => {
    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 top-20">
          <span className="loader"></span>
        </div>
      );
}

export default Loader
