import { use, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { BounceLoader } from "react-spinners";
import MyLink from "../components/MyLink";
const MyActivities = () => {
  const { user } = use(AuthContext);
  const [loading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    if (user && user.email) {
      fetch(`https://ass-10-sigma.vercel.app/participants?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setChallenges(data);
          setLoading(false);
        })
        .catch((e) => toast(e));
    }
  }, [user]);

  if (loading) {
    return  <div className="min-h-screen flex items-center justify-center">
        <BounceLoader
  color="#0ff051"
  size={200}
  speedMultiplier={3}
/>
      </div>;
  }
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-around my-15 items-center">
        <MyLink to="/add-challenge">Add Challenge</MyLink>
        <MyLink to="/my-added-challenges">My Added Challenges</MyLink>
      </div>
         {challenges.length==0?
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        You have not joined any challenges yet.
      </div>:<div>
        <h1 className="text-3xl font-bold mb-6 text-center">I have Joined</h1>
      <div className="grid gap-4">
        {challenges.map((p) => (
          <div
            key={p._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              Challenge ID: {p._id}
            </h2>
            <p>
              <span className="font-medium">Status:</span> {p.status}
            </p>
            <p>
              <span className="font-medium">Progress:</span> {p.progress}%
            </p>
            <p className="mb-7">
              <span className="font-medium">Joined On:</span>
              {new Date(p.joinDate).toLocaleDateString()}
            </p>
            <MyLink
        to={`/challenge-details/${p.challengeId}`}
        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-center"
      >
        View Details
      </MyLink>
          </div>
        ))}
      </div>
      </div>}
      
    </div>
  );
};

export default MyActivities;