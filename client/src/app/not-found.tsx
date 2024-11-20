import Link from 'next/link'


const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center py-8 px-4">
      
      {/* Heading */}
      <h1 className="text-4xl font-semibold text-gray-800 mb-4">
        Oops! Page Not Found
      </h1>
      
      {/* Message */}
      <p className="text-lg text-gray-600 mb-6">
        The page you are looking for dose not exist or has been moved.
      </p>
      
      {/* Button to go back to homepage */}
      <Link href="/">
      <span className="text-blue-500 hover:text-blue-700 cursor-pointer">Go back to Homepage</span>
        
      </Link>
    </div>
  )
}

export default NotFound