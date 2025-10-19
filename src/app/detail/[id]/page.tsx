import { getPostById } from "@/app/utils/supabase";
import { Post } from "@/app/utils/definitions";

export default async function Detail(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = Number(params.id);
    const post = await getPostById(id);
    return (
        <div>
            <h2>{post.title}</h2>
            <p className="text-black text-sm">Created at: {new Date(post.created_at).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')}</p>
            <p className="text-black text-lg mt-4">{post.content}</p>
        </div>
    );
}