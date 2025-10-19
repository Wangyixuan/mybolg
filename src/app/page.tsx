import { getLatestPosts } from "@/app/utils/supabase";
import PostCard from "@/app/components/postCard";
import Link from "next/link";

export default async function Home() {

    const latestPosts = await getLatestPosts();

    return (

        <div className="flex flex-col gap-4">
         <div className="bg-white rounded-md p-4 h-[300px]">
            <h2 className="text-3xl font-bold text-black">Who is Lao Wang?</h2>
        </div>
            <h2 className="text-2xl font-bold text-black">最近更新</h2>
            {
                latestPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))
            }
            <div className="flex justify-end">
                <Link
                    href="/list"
                    className="flex items-center bg-white rounded-lg p-4 text-m font-bold text-gray-600 transition-colors hover:shadow-lg transition-shadow duration-300"
                >
                    查看全部
                </Link></div>

        </div>
    );
}