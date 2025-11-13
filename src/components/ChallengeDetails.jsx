import { use, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";



const ChallengeDetails = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [challenge, setChallenge] = useState({});
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);


  useEffect(() => {
    fetch(`https://ass-10-sigma.vercel.app/challenges/${id}`, {

    })
      .then((res) => res.json())
      .then((data) => {
        setChallenge(data.result);
        setLoading(false);
      });
  }, [user, id, refetch]);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://ass-10-sigma.vercel.app/challenges/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            navigate('/');

            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((e) => {
            toast(e)
          });
      }
    });
  };

  const handleParticipate = () => {
    const Challenge = {
      participatedBy: user.email,
      status: "Ongoing",
      progress: 0,
      joinDate: new Date(),
    };

    fetch(`https://ass-10-sigma.vercel.app/participants/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Challenge),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Successfully Participated!");
        setRefetch(!refetch)

      })
      .catch((e) => {
        toast(e)
      });
  };


  if (loading) {
    return <div>Please wait!Loading...</div>;
  }

  return (
  <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md text-center">
    <img
      src={challenge.imageUrl}
      alt={challenge.title}
      className="w-full h-48 object-cover rounded-md mb-4"
    />
    <h2 className="text-2xl font-semibold mb-2">{challenge.title}</h2>
    <p className="text-gray-600 mb-1">Category: {challenge.category}</p>
    <p className="text-gray-700 mb-3">{challenge.description}</p>

    <div className="text-gray-600 space-y-1 mb-4">
      <p>Duration: {challenge.duration} days</p>
      <p>Participants: {challenge.participants}</p>
      <p>Target: {challenge.target}</p>
      <p>Impact Metric: {challenge.impactMetric}</p>
      <p>Start Date: {challenge.startDate}</p>
      <p>End Date: {challenge.endDate}</p>
      <p>Created By: {challenge.createdBy}</p>
    </div>

    <div className="flex justify-center gap-3">
      <Link
        to={`/update-challenge/${challenge._id}`}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Update
      </Link>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Delete
      </button>
      <button
        onClick={handleParticipate}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Participate
      </button>
    </div>
  </div>
);

};

export default ChallengeDetails;