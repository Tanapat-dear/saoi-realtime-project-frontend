export default function Loadingindicator() {
    return(
          <div className="flex items-center justify-center min-h-[92vh] space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.4s]"></div>
                <span className="ml-2 text-gray-500 font-medium tracking-wide animate-pulse">
                    Loading...
                </span>
            </div>
    )
}