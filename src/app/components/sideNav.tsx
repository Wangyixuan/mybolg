import Image from "next/image";
import Link from "next/link";


export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-4 py-6 md:px-3">
      <Link href="/" className="mb-6">
        <div className="flex flex-col items-center justify-center bg-gradient-to-r from-indigo-50 to-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-center mb-2">
            <Image src="/logo.svg" alt="logo" width={50} height={50} className="mr-2" />
            <h1 className="text-indigo-700 text-xl font-bold">Welcome</h1>
          </div>
          <h1 className="text-indigo-900 text-2xl font-bold">Lao Wang's Blog</h1>
        </div>
      </Link>

      <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4 shadow-sm gap-5">
        
        <Link href="/list" className="w-full">
          <div className="py-2 px-4 rounded-md text-gray-800 hover:bg-indigo-600 hover:text-white transition-all duration-300 w-full text-center">
            <h2 className="text-lg font-semibold">所有文章</h2>
          </div>
        </Link>

        <Link href="/category" className="w-full">
          <div className="py-2 px-4 rounded-md text-gray-800 hover:bg-indigo-600 hover:text-white transition-all duration-300 w-full text-center">
            <h2 className="text-lg font-semibold">文章分类</h2>
          </div>
        </Link>
        
        <Link href="/create" className="w-full">
          <div className="py-2 px-4 rounded-md text-gray-800 hover:bg-indigo-600 hover:text-white transition-all duration-300 w-full text-center">
            <h2 className="text-lg font-semibold">新建文章</h2>
          </div>
        </Link>
      </div>

    </div>
  );
}