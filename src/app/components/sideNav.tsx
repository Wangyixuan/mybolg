import Image from "next/image";
import Link from "next/link";


export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link href="/">
        <div className="flex flex-col items-center justify-center bg-white rounded-md p-2">
          <div className="flex items-center justify-center">
            <Image src="/logo.svg" alt="logo" width={50} height={50} />
            <h1 className="text-black text-xl font-bold">Welcome</h1>
          </div>
          <h1 className="text-black text-2xl font-bold">Lao Wang's Blog</h1>
        </div>
      </Link>

      <div className="flex flex-col items-center justify-center bg-white rounded-md p-2 mt-4 gap-4">
        
        <Link href="/list">
          <div>
            <h2 className="text-black text-xl font-bold">所有文章</h2>
          </div>
        </Link>

        <Link href="/category">
          <div>
            <h2 className="text-black text-xl font-bold">文章分类</h2>
          </div>
        </Link>
                <Link href="/create">
          <div>
            <h2 className="text-black text-xl font-bold">新建文章</h2>
          </div>
        </Link>
      </div>

    </div>
  );
}