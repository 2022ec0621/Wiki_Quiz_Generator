export default function HistorySkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1,2,3].map(i => (
        <div
          key={i}
          className="h-20 rounded-xl bg-slate-800"
        />
      ))}
    </div>
  );
}
