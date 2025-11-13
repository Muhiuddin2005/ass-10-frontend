import { NavLink, useLoaderData } from "react-router";
import Challenge from "../components/challenge";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, LabelList } from "recharts";
import SkeletonChallengeCard from "../components/SkeletonChallengeCard";


const Home = () => {
  const challenges = useLoaderData();
  const [tips, setTips] = useState([]);
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
  totalParticipants: 0,
  totalCO2Reduced: 0,
  totalWaterLiterSaved: 0
});

useEffect(() => {
  fetch("http://localhost:3000/live-stats")
    .then(res => res.json())
    .then(data => setStats(data));
}, []);
const data = [
  {
    metric: "Community Impact",
    "CO₂ Reduced (kg)": stats.totalCO2Reduced,
    "Water Saved (L)": stats.totalWaterLiterSaved,
    "Total Participants": stats.totalParticipants
  }
];

  

  useEffect(() => {
    fetch("http://localhost:3000/latest-tips")
      .then(res => res.json())
      .then(data => setTips(data));

    fetch("http://localhost:3000/upcoming-events")
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);
  return (
    <>


    {/* Corouesel....................... */}


      <div className="w-full flex justify-center items-center py-10 bg-green-50">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="w-full max-w-6xl rounded-2xl shadow-lg"
        >
          {challenges.map((challenge) => (
            <SwiperSlide
              key={challenge._id}
              className="flex flex-col items-center justify-center bg-white p-8 text-center rounded-2xl transition-all duration-300 hover:bg-green-100"
            >
              <img
                src={challenge.imageUrl}
                alt={challenge.title}
                className="h-100 rounded-xl mb-5 w-full object-cover shadow-md transition-transform duration-300 hover:scale-105"
              />
              <h2 className="text-2xl font-bold text-green-700 mb-2">
                {challenge.title}
              </h2>
              <p className="text-green-600 mb-4">
                {challenge.description?.slice(0, 80)}...
              </p>
              <NavLink
                to={`/challenge-details/${challenge._id}`}
                className="bg-green-500 text-white px-5 py-2 rounded-md font-medium hover:bg-green-600 transition-all duration-300"
              >
                View Challenge
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>


        {/* Cards...................... */}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {challenges.length > 0
        ? challenges.slice(0, 5).map((challenge) => (
            <Challenge key={challenge._id} challenge={challenge} />
          ))
        :
          Array.from({ length: 5 }).map((index) => (
            <SkeletonChallengeCard key={index} />
          ))}
      </div>
  



    

    
    {/* Dynamic................... */}
    <div className="p-4 flex flex-col items-center space-y-7">
  
  <div className="w-full max-w-4xl">
    <h2 className="text-2xl font-semibold mb-6 text-center">Recent Tips</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tips.map((tip, index) => (
        <div 
          key={index} 
          className="p-5 border rounded-2xl shadow-lg hover:shadow-2xl hover:bg-green-50 transition transform duration-300" 
        > 
          <h3 className="font-semibold text-lg mb-1">{tip.title}</h3>
          <p className="text-sm text-gray-600 mb-2">By {tip.authorName} | Upvotes: {tip.upvotes}</p>
          <p className="text-gray-700 text-sm">{tip.content}</p>
        </div>
      ))}
    </div>
  </div>

  <div className="w-full max-w-4xl">
    <h2 className="text-2xl font-semibold mb-6 text-center">Upcoming Events</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {events.map((event, index) => (
        <div 
          key={index} 
          className="p-5 border rounded-2xl shadow-lg hover:shadow-2xl hover:bg-blue-50 transition transform duration-300"
        >
          <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{new Date(event.date).toLocaleDateString()} | {event.location}</p>
          <p className="text-gray-700 text-sm">{event.description}</p>
        </div>
      ))}
    </div>
  </div>

</div>


{/* BarChart.................................... */}

 <div className="max-w-xl mx-auto p-4 border rounded shadow-lg bg-white my-6 hover:bg-yellow-50 transition transform duration-300">
      <h2 className="text-2xl font-semibold text-center mb-2">Community Totals</h2>
      <p className="text-center mb-4">
        Total Participants: <strong>{stats.totalParticipants}</strong>
      </p>

      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="metric" tick={false} axisLine={false} />
        <YAxis />
        <Bar dataKey="CO₂ Reduced (kg)" fill="#4CAF50">
          <LabelList dataKey="CO₂ Reduced (kg)" position="inside" formatter={(value) => `${value} kg`} />
        </Bar>
        <Bar dataKey="Water Saved (L)" fill="#2196F3">
          <LabelList dataKey="Water Saved (L)" position="inside" formatter={(value) => `${value} L`} />
        </Bar>
      </BarChart>
      <div className="flex justify-between mt-2 px-8">
        <span className="text-center w-1/2 text-blue-700 font-medium ml-8">Water Saved</span> 
  <span className="text-center w-1/2 text-green-700 font-medium">CO₂ Reduced</span>
  
</div>
    </div>


    {/* Static........................... */}

      <div className="p-8 space-y-12 bg-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Why Go Green?</h2>
          <ul className="list-disc space-y-2 text-left max-w-md mx-auto">
            <li>Reduces environmental pollution</li>
            <li>Conserves natural resources</li>
            <li>Promotes healthier living</li>
            <li>Saves energy and reduces costs</li>
            <li>Supports biodiversity and wildlife</li>
          </ul>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded shadow-md w-64">
              <h3 className="font-bold mb-2">Step 1</h3>
              <p>Join a challenge</p>
            </div>
            <div className="bg-white p-6 rounded shadow-md w-64">
              <h3 className="font-bold mb-2">Step 2</h3>
              <p>Track progress</p>
            </div>
            <div className="bg-white p-6 rounded shadow-md w-64">
              <h3 className="font-bold mb-2">Step 3</h3>
              <p>Share tips</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
