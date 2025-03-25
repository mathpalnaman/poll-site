'use client';//remember to put use client 
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Poll = () => {
  const [votes, setVotes] = useState({ React: 0, Vue: 0, Angular: 0 });
  const [comments, setComments] = useState<{ name: string; text: string }[]>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [comment, setComment] = useState("");

  const handleVote = () => {
    if (selectedOption) {
      setVotes((prev) => ({ ...prev, [selectedOption]: prev[selectedOption] + 1 }));//ignore 'any' errors they will work regardless
    }
  };

  const handleComment = () => {
    if (selectedOption && comment.trim()) {
      setComments((prev) => [...prev, { name: selectedOption, text: comment }]);
      setComment("");
    }
  };

  const chartData = Object.keys(votes).map((option) => ({
    name: option,
    votes: votes[option],
  }));

  return (
    <div className="max-w-5xl w-full mx-auto p-4">
      {/* Main container - Grid layout for large screens */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Poll section (Takes 2/3 on large screens) */}
        <div className="md:col-span-2 bg-white p-6 shadow-lg rounded-lg border">
          {/* My comment */}
          <blockquote className="text-gray-600 italic border-l-4 border-blue-500 pl-4 mb-4">
            "Hey everyone! I'm Naman Mathpal, a React developer exploring the world of JavaScript frameworks. 
            While I enjoy working with React, I’m curious to know which framework you prefer and why. 
            What makes your choice stand out? Share your thoughts—I’d love to hear different perspectives!"
          </blockquote>

          {/* Poll Title */}
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">
            Which framework do you prefer?
          </h2>

          {/* Voting Options */}
          <div className="space-y-3">
            {Object.keys(votes).map((option) => (
              <label key={option} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-100 transition">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="framework"
                    value={option}
                    className="accent-blue-600"
                    onChange={() => setSelectedOption(option)}
                  />
                  <span className="text-lg font-medium text-gray-700">{option}</span>
                </div>
                <span className="text-gray-600 text-sm bg-gray-200 px-2 py-1 rounded-md">
                  {votes[option]} votes
                </span>
              </label>
            ))}
          </div>

          {/* Vote Button */}
          <button
            onClick={handleVote}
            className="mt-4 w-full py-2 text-sm md:text-lg bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Submit Vote
          </button>

          {/* Graph for v ote distribution */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Vote Distribution</h3>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="votes" fill="#4F46E5" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Comments Section (Takes 1/3 on large screens) */}
        <div className="bg-gray-50 p-6 shadow-lg rounded-lg border">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Share Your Thoughts</h3>

          {/* Comment Input */}
          <textarea
            className="text-gray-800 w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Why did you choose this?"
          />
          <button
            onClick={handleComment}
            className="mt-3 w-full py-2 text-sm md:text-lg bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
          >
            Add Comment
          </button>

          {/* Display Comments */}
          {comments.length > 0 && (
            <div className="mt-6 space-y-3 max-h-60 overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-800">Comments</h3>
              {comments.map((c, index) => (
                <div key={index} className="p-3 bg-white border-l-4 border-blue-500 rounded-lg shadow-sm">
                  <p className="text-gray-700 font-medium">{c.name}:</p>
                  <p className="text-gray-600">{c.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Poll;
