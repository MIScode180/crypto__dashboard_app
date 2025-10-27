import { Loader2 } from "lucide-react";
import React from 'react'

export default function Loader() {
  return (
     <div className="flex justify-center items-center py-10">
      <Loader2 className="animate-spin h-8 w-8 text-blue-600 dark:text-white" />
    </div>
  )
}
