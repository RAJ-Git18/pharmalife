import React from 'react'
import { Spinner } from './ui/spinner'

const Loader = () => {
    return (
        <div className="h-screen w-screen flex items-center justify-center backdrop-blur-sm">
            <Spinner size="lg" className="bg-green-600 dark:bg-white mb-32" />
        </div>
    )
}

export default Loader
