export default function DifficultySelect({ value, onChange }) {
  return (
    <div className="w-full">
      <label className="block mb-2 text-sm text-gray-300">
        Difficulty
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full rounded-lg bg-slate-800 border border-slate-600
          px-4 py-3 text-white
          focus:outline-none focus:ring-2 focus:ring-pink-500
        "
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
}
