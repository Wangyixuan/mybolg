import PostCard from "@/app/components/postCard";
import { Post } from "@/app/utils/definitions";
import { getPostsByCategory } from "@/app/utils/supabase";

export default async function PostList({
  searchParams,
}: {
  searchParams?: Promise<{ name?: string }>;
}) {

  const params = await searchParams;
  // 获取分类名称
  const categoryName = params?.name || '';
  
  // 直接从URL参数获取文章数据
  let posts: Post[] = [];
  try {
    posts = await getPostsByCategory(categoryName);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
  
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        <span className="text-3xl text-indigo-600 font-extrabold">{categoryName}</span> 分类下的文章
      </h1>
      {posts && posts.length > 0 ? (
        <div className="grid gap-6 mb-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-center py-8">
          该分类下暂无文章
        </div>
      )}
    </div>
  );
}