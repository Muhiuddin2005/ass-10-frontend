import React from 'react';
import { BounceLoader } from "react-spinners";

const Spinner = () => {
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center">
        <BounceLoader
  color="#0ff051"
  size={200}
  speedMultiplier={3}
/>
      </div>;
        </div>
    );
};

export default Spinner;