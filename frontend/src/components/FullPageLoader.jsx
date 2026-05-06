const FullPageLoader = () => (
  <div className="flex min-h-[70vh] items-center justify-center px-4">
    <div className="glass flex w-full max-w-sm flex-col items-center gap-5 rounded-2xl p-8 text-center">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-white/10 border-t-teal-300" />
      <div>
        <p className="text-lg font-bold text-white">Securing your session</p>
        <p className="mt-1 text-sm text-slate-300">Checking your authentication state.</p>
      </div>
    </div>
  </div>
);

export default FullPageLoader;
