import { getPosts } from "@/app/utils/supabase";
import PostCard from "@/app/components/postCard";
import Pagination from "@/app/components/pageination";

export const dynamic = 'force-dynamic';

export default async function List({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
    // 在 Next.js 15 中，需要先 await searchParams
    const params = await searchParams;
    const page = Number(params?.page || '1');

    const { data: allPosts, totalPage } = await getPosts(page-1);

    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-4">
                {
                    allPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))
                }
            </div>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPage}/>
            </div>
        </div>
    );
}