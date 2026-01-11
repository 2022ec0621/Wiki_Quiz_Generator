import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function HistoryCard({ item, onDelete }) {
    const navigate = useNavigate();
  return (
    <div  className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex justify-between items-center">
      <div onClick={() => navigate(`/`)}>
        <h3 className="text-lg font-semibold text-white">
          {item.title}
        </h3>
        <p className="text-sm text-slate-400 mt-1">
          Difficulty: <span className="capitalize">{item.difficulty}</span>
        </p>
        <p className="text-xs text-slate-500">
          {new Date(item.date_generated).toLocaleString()}
        </p>
      </div>

      <button
        onClick={() => onDelete(item.id)}
        className="text-red-400 hover:text-red-500 transition"
      >
        <FaRegTrashAlt  size={20} />
      </button>
    </div>
  );
}
