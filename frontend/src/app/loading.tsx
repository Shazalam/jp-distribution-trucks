export default function Loading() {
  return (
    <div className="flex h-[50vh] w-full flex-col items-center justify-center bg-transparent">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="absolute h-24 w-24 rounded-full border-t-2 border-red-600 animate-spin"></div>
        {/* Inner static logo placeholder or smaller ring */}
        <div className="h-16 w-16 rounded-full border-2 border-white/10 flex items-center justify-center">
          <span className="text-red-600 font-black text-xl tracking-tighter">JP</span>
        </div>
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-red-600/20 blur-xl rounded-full"></div>
      </div>
      <p className="mt-6 text-sm font-bold text-gray-400 uppercase tracking-[0.2em] animate-pulse">
        Loading Assets...
      </p>
    </div>
  );
}
