import { CiClock1 } from "react-icons/ci";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-pulse flex flex-col items-center justify-center">
        <div className="w-50 h-50 bg-gray-200 rounded-full mb-4">
          <CiClock1 size={100} className="text-6xl text-gray-400" />
        </div>
        <div className="w-40 h-6 bg-gray-200 rounded-full text-center">
          Loading...
        </div>
      </div>
    </div>
  )
}