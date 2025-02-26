// import Image from "next/image";

// import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <div>
     <main className="flex flex-col  row-start-2 items-center sm:items-start">
       <Link className="text-blue-600 font-bold border"
        href='/dashboard'
       > Go to Dashboard</Link>
       <p className="text-xl text-gray-700 dark:text-gray-400">
         The next-generation financial management platform
       </p>
     </main>
   </div>
  )

}