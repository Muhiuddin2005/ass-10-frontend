import React from 'react';
import { useLoaderData } from 'react-router';
import Challenge from '../components/challenge';


const ChallengesPage = () => {
    const challenges=useLoaderData();
    return (
    <>
  
    <div className="grid grid-cols-3 gap-3">
        {challenges.map((challenge) => (
          <Challenge key={challenge._id} challenge={challenge} />
        ))}
      </div>
      </>
        
    );
};

export default ChallengesPage;