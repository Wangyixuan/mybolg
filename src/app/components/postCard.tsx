import { Post } from "@/app/utils/definitions";
import Link from "next/link";
import Tags from "@/app/components/tags";

export default function PostCard({ post }: { post: Post }) {
    return (
        <div className="bg-white rounded-md p-4 hover:shadow-lg transition-shadow duration-300">
            <Link href={`/detail/${post.id}`}>
                <h2 className="text-black text-xl font-bold">{post.title}</h2>
                <p className="text-black text-lg line-clamp-2">{post.content}</p>
                {
                    (post.updated_at && post.updated_at > 0) ?
                        <p className="text-black text-sm">Updated at: {new Date(post.updated_at).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')}</p> :
                        <p className="text-black text-sm">Created at: {new Date(post.created_at).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')}</p>
                }
                <div className="flex flex-wrap gap-2 w-full h-8 mt-2">
                {post.tags && Array.isArray(post.tags) ?
                    post.tags.map((tag) => (
                        <div
                            key={typeof tag === 'object' ? JSON.stringify(tag) : tag}
                            className="text-sm p-4 rounded-full h-full flex items-center justify-center duration-200 bg-blue-500 text-white"
                        >
                            {typeof tag === 'object' ? JSON.stringify(tag) : tag}
                        </div>
                    ))
                    : null}
            </div>
            </Link>
        </div>
    );
}