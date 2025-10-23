'use client';

import { useRouter } from 'next/navigation';
import { deletePostById } from "@/app/utils/supabase";
import { useEffect } from 'react';

export default function DeleteButton({ postId }: { postId: number }) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  const handleDelete = async () => {
    if (confirm('确定要删除这篇文章吗？')) {
      const isSuc = await deletePostById(postId);
      if (isSuc) {
        router.back();
      } else {
        alert('删除失败，请重试');
      }
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="inline-flex items-center justify-center p-2 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      删除
    </button>
  );
}