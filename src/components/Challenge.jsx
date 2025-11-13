import MyLink from './MyLink';

const Challenge = ({ challenge }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-between">
      <img
        src={challenge.imageUrl}
        alt={challenge.title}
        className="w-full h-40 object-cover rounded mb-4"
      />
      <h2 className="text-lg font-bold mb-2">{challenge.title}</h2>
      <p className="text-sm text-gray-500 mb-2">Category: {challenge.category}</p>
      <p className="text-gray-700 mb-2">{challenge.description}</p>
      <p className="text-gray-600 mb-1">Duration: {challenge.duration} days</p>
      <p className="text-gray-600 mb-4">Impact: {challenge.impactMetric}</p>
      <p className="text-gray-600 mb-4">Participants: {challenge.participants}</p>
      <MyLink
        to={`/challenge-details/${challenge._id}`}
        className="text-white px-3 py-1 rounded text-center"
      >
        View Details
      </MyLink>
    </div>
  );
};

export default Challenge;
