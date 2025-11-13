import { useLoaderData, useParams } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const UpdateChallenge = () => {
  const { user } = useContext(AuthContext);
  const data = useLoaderData();
  const challenge = data.result;
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title: e.target.title.value,
      category: e.target.category.value,
      description: e.target.description.value,
      duration: parseInt(e.target.duration.value),
      target: e.target.target.value,
      impactMetric: e.target.impactMetric.value,
      startDate: e.target.startDate.value,
      endDate: e.target.endDate.value,
      imageUrl: e.target.imageUrl.value,
      updatedAt: new Date().toISOString(),
      updatedBy: user?.displayName
    };

    fetch(`https://ass-10-sigma.vercel.app/challenges/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Challenge updated successfully!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-3"
      >
        <h2 className="text-center text-xl font-semibold mb-4">
          Update Challenge
        </h2>

        <input
          type="text"
          name="title"
          defaultValue={challenge.title}
          className="w-full border p-2 rounded-md"
          placeholder="Title"
          required
        />

        <input
          type="text"
          name="category"
          defaultValue={challenge.category}
          className="w-full border p-2 rounded-md"
          placeholder="Category"
          required
        />

        <textarea
          name="description"
          defaultValue={challenge.description}
          rows="3"
          className="w-full border p-2 rounded-md"
          placeholder="Description"
          required
        ></textarea>

        <input
          type="number"
          name="duration"
          defaultValue={challenge.duration}
          className="w-full border p-2 rounded-md"
          placeholder="Duration (days)"
          required
        />

        <input
          type="text"
          name="target"
          defaultValue={challenge.target}
          className="w-full border p-2 rounded-md"
          placeholder="Target"
          required
        />

        <input
          type="text"
          name="impactMetric"
          defaultValue={challenge.impactMetric}
          className="w-full border p-2 rounded-md"
          placeholder="Impact Metric"
          required
        />

        <input
          type="date"
          name="startDate"
          defaultValue={challenge.startDate}
          className="w-full border p-2 rounded-md"
          required
        />

        <input
          type="date"
          name="endDate"
          defaultValue={challenge.endDate}
          className="w-full border p-2 rounded-md"
          required
        />

        <input
          type="text"
          name="imageUrl"
          defaultValue={challenge.imageUrl}
          className="w-full border p-2 rounded-md"
          placeholder="Image URL"
          required
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
        >
          Update Challenge
        </button>
      </form>
    </div>
  );
};

export default UpdateChallenge;
