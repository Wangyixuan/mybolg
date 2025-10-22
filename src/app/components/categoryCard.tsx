import { CategoryInfo } from "@/app/utils/definitions";
import Link from "next/link";
import PostList from "../category/postList/page";

export default async function CategoryCard({ data }: { data: CategoryInfo }) {
    return (
        <div className="bg-gradient-to-r from-slate-50 to-white rounded-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 h-full flex flex-col justify-between">
            <Link href={`/category/postList?name=${encodeURIComponent(data.name)}`}>
                <div>
                    <h2 className="text-indigo-800 text-xl sm:text-2xl font-bold mb-2 sm:mb-3 hover:text-indigo-600 transition-colors">
                        {data.name}
                    </h2>
                    <div className="h-1 w-20 bg-indigo-200 rounded mb-3"></div>
                </div>
                <div className="flex justify-end items-center mt-4 gap-2">
                    <span className="text-gray-600 text-sm">文章数量</span>
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-medium text-sm">
                        {data.postCount} 篇
                    </span>
                </div>
            </Link>
        </div>
    );
}