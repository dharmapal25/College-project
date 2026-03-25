import React from 'react'

const Error404 = () => {
    return (
        <div className="h-screen bg-gray-900 dark:bg-gray-800 flex items-center justify-center">
            <title>404 Not Found</title>
            <div className="text-center">
                <h1 className="text-4xl font-bold text-white dark:text-gray-200">404 Not Found</h1>
                <button onClick={() => window.location.href = '/'} className="mt-8 px-4 py-2 bg-gray-800 dark:bg-gray-900 text-white dark:text-gray-200 rounded-lg">
                    Go back to homepage
                </button>
            </div>
            <h1>404 Not Found</h1>
        </div>
    )
}

export default Error404