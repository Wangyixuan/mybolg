import { Post } from "@/app/utils/definitions";
import Link from "next/link";
import Tags from "@/app/components/tags";
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

export default async function PostCard({ post }: { post: Post }) {
    const processedContent = await remark()
        .use(remarkGfm) // 支持GitHub风格的Markdown
        .use(html)
        .process(post.content);
    const contentHtml = processedContent.toString();
    
    return (
        <div className="bg-gradient-to-r from-slate-50 to-white rounded-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 border border-gray-200">
            <Link href={`/detail/${post.id}`} className="block">
                <h2 className="text-indigo-800 text-xl sm:text-2xl font-bold mb-2 sm:mb-3 hover:text-indigo-600 transition-colors">{post.title}</h2>
                <div 
                    className="text-gray-700 text-base sm:text-lg line-clamp-2 mb-2 sm:mb-3 prose-sm prose-indigo"
                    dangerouslySetInnerHTML={{ __html: contentHtml || post.content }}
                />
                {
                    post.updated_at ?
                        <p className="text-gray-500 text-xs sm:text-sm font-medium">更新于: {new Date(post.updated_at).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')}</p> :
                        <p className="text-gray-500 text-xs sm:text-sm font-medium">发布于: {new Date(post.created_at).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')}</p>
                }
                <div className="flex flex-wrap gap-1 sm:gap-2 w-full mt-3 sm:mt-4">
                {post.tags && Array.isArray(post.tags) ?
                    post.tags.map((tag) => (
                        <div
                            key={typeof tag === 'object' ? JSON.stringify(tag) : tag}
                            className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-indigo-100 text-indigo-800"
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