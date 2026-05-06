const SkeletonCard = () => (
  <div className="glass rounded-3xl p-6">
    <div className="skeleton h-5 w-32 rounded-full" />
    <div className="skeleton mt-5 h-9 w-24 rounded-xl" />
    <div className="skeleton mt-4 h-4 w-full rounded-full" />
    <div className="skeleton mt-2 h-4 w-3/4 rounded-full" />
  </div>
);

export default SkeletonCard;
