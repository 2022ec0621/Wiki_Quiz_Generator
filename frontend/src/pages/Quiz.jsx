import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const quiz = state?.quiz || [];

  return (
    <>
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

      <div className="min-h-screen px-6 py-10">
        <h2 className="text-3xl font-bold mb-6">{state?.title}</h2>

        {quiz.map((q, i) => (
          <Question key={i} q={q} />
        ))}
      </div>
    </>
  );
}

function Question({ q }) {
  const [show, setShow] = useState(false);

  return (
    <div className="bg-gray-800 p-6 rounded mb-6">
      <h3 className="mb-4 font-semibold">{q.question}</h3>

      {q.options.map((opt, i) => (
        <div key={i}>{opt}</div>
      ))}

      <button
        onClick={() => setShow(!show)}
        className="mt-4 border px-4 py-2 rounded"
      >
        Show Answer
      </button>

      {show && <p className="text-green-400 mt-2">Answer: {q.answer}</p>}
    </div>
  );
}
