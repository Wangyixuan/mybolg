import { getLatestPosts } from "@/app/utils/supabase";
import PostCard from "@/app/components/postCard";
import Link from "next/link";

// 强制页面动态渲染，确保每次访问都获取最新数据
export const dynamic = 'force-dynamic';

export default async function Home() {

    const latestPosts = await getLatestPosts();

    return (

        <div className="flex flex-col gap-6 max-w-5xl mx-auto px-4 py-6">
         <div className="bg-gradient-to-r from-indigo-50 to-white rounded-lg p-8 shadow-sm mb-4">
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">Who is Lao Wang?</h2>
            <p className="text-gray-700 text-lg">一个热爱分享技术和生活的中登，欢迎来到我的博客！</p>
        </div>
            <h2 className="text-2xl font-bold text-indigo-800 mb-2">最近更新</h2>
            <div className="grid gap-6 mb-6">
            {
                latestPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))
            }
            </div>
            <div className="flex justify-end">
                <Link
                    href="/list"
                    className="flex items-center bg-indigo-600 rounded-lg px-6 py-3 text-base font-semibold text-white hover:bg-indigo-700 transition-all duration-300"
                >
                    查看全部 →
                </Link>
            </div>
        </div>
    );
}