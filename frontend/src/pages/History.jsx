import { useEffect, useState } from "react";
import { getHistory, deleteHistory } from "../api/history";
import HistoryCard from "../components/HistoryCard";
import HistorySkeleton from "../components/HistorySkeleton";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const res = await getHistory();
      setHistory(res.data.history);
      console.log(res.data.history)
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteHistory(id);
    setHistory(prev => prev.filter(h => h.id !== id));
  };

  useEffect(() => {
    loadHistory();
  }, []);


 

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          Quiz History
        </h1>

        {loading && <HistorySkeleton />}

        {!loading && history.length === 0 && (
          <p className="text-slate-400 text-center">
            No quiz history found.
          </p>
        )}

        {!loading && history.length > 0 && (
          <div className="space-y-4">
            {history.map(item => (
                
              <HistoryCard
                key={item.id}
                item={item}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
