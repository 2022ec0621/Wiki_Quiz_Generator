import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/generate_quiz", {
        url,
        difficulty,
      });
      navigate("/quiz", { state: res.data });
    } catch (err) {
      console.error(err);
      alert("Failed to generate quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] to-[#020617] text-white px-6 py-4">
      
      {/* 🔹 Header */}
      <div className="flex justify-between items-center mb-16">
        <h1 className="text-xl font-semibold">Wiki Quiz APP</h1>

        {/* ✅ History Button */}
        <button
          onClick={() => navigate("/history")}
          className="px-4 py-2 rounded-lg border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition"
        >
          History
        </button>
      </div>

      {/* 🔹 Main Content */}
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold mb-6">
          WIKI AI Quiz Generator
        </h2>

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://en.wikipedia.org/wiki/India"
          className="w-full max-w-xl px-4 py-3 rounded-lg bg-transparent border border-blue-500 focus:outline-none mb-4"
        />

        {/* Difficulty */}
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full max-w-xl px-4 py-3 rounded-lg bg-[#020617] border border-gray-600 mb-6 "
        >
          <option  value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="px-8 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate From Website"}
        </button>
      </div>
    </div>
  );
}
