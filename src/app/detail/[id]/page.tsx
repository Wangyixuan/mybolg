import { getPostById } from "@/app/utils/supabase";
import { Post } from "@/app/utils/definitions";
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import DeleteButton from '@/app/components/DeleteButton';
import EditButton from '@/app/components/EditButton';

export default async function Detail(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = Number(params.id);
    const post = await getPostById(id);

    // 处理Markdown内容
    const processedContent = await remark()
        .use(remarkGfm) // 支持GitHub风格的Markdown
        .use(html)
        .process(post.content);
    const contentHtml = processedContent.toString();

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 bg-white shadow-lg rounded-lg my-8">

            {/* 文章标题、操作按钮和日期 */}
            <div className="border-b border-gray-200 pb-6 mb-6">
                <div className="relative mb-4">
                    <div className="flex justify-between items-start">
                        <div className="flex-1 pr-20">
                            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight break-words">{post.title}</h1>
                        </div>
                        <div className="flex space-x-2 flex-shrink-0 absolute top-0 right-0">
                            <EditButton post={post} />
                            <DeleteButton postId={post.id} />
                        </div>
                    </div>
                </div>

                {/* 标签显示 */}
                {post.tags && post.tags.length > 0 && (
                    <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag: string, index: number) => (
                                <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex items-center text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {
                        post.updated_at ?
                        <span>更新于: {new Date(post.updated_at).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')}</span> :
                        <span>发布于: {new Date(post.created_at).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')}</span>
                    }
                </div>
            </div>

            {/* 文章内容 */}
            <div
                className="prose prose-lg prose-indigo max-w-none prose-headings:text-indigo-700 prose-a:text-indigo-600 prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:text-indigo-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
        </div>
    );
}