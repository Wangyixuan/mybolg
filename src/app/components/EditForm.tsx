'use client';

import Link from "next/link";
import { createPost, getCategories, updatePost } from "@/app/utils/supabase";
import Tags from "@/app/components/tags";
import { useState, useEffect } from "react";
import { Category, Post } from "@/app/utils/definitions";
import { useRouter } from 'next/navigation';

interface EditFormProps {
  post: Post;
  onCancel?: () => void;
}

export default function EditForm({ post, onCancel }: EditFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedTagNames, setSelectedTagNames] = useState<string[]>([]);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [isFormValid, setIsFormValid] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // 获取分类数据
    async function fetchCategories() {
      const categoriesData = await getCategories();
      if (post.tags && Array.isArray(post.tags)) {
        // 初始化分类选中状态
        const categoriesWithSelected = categoriesData.map(category => ({
          ...category,
          isSelected: post.tags.includes(category.name)
        }));
        setCategories(categoriesWithSelected);

      } else {
        setCategories(categoriesData);
      }

    }

    fetchCategories();
  }, []);

  // 验证表单
  useEffect(() => {
    setIsFormValid(title.trim() !== '' && content.trim() !== '');
  }, [title, content]);

  const submitHandler = async (formData: FormData) => {
    setIsEditing(true);
    // 添加ID到表单数据
    formData.append('id', post.id.toString());

    const isSuc = await updatePost(formData);
    if (isSuc) {
      router.refresh();
      if (onCancel) {
        onCancel();
      }
    } else {
      alert('更新失败，请重试');
    }
    setIsEditing(false);
  }

  return (
    <div className="bg-white w-full p-4 rounded-md">
      <form action={submitHandler}>
        <div className="flex flex-col justify-center rounded-md">
          <label htmlFor="title" className="text-black text-xl font-bold">
            文章标题:
          </label>
          <input
            name="title"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded-md bg-blue-50"
          />
        </div>
        <div className="flex flex-col justify-center rounded-md mt-4">
          <label htmlFor="content" className="text-black text-xl font-bold">
            文章内容:
          </label>
          <textarea
            name="content"
            id="content"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded-md bg-blue-50"
          />
        </div>
        <div className="flex flex-col justify-center rounded-md mt-4">
          <label htmlFor="tags" className="text-black text-xl font-bold">
            文章分类:
          </label>
          <Tags tags={categories} onTagsChange={setSelectedTagNames} />
          <input type="hidden" name="selectedTags" value={JSON.stringify(selectedTagNames)} />
          <input type="text" name="customTags" placeholder="自定义标签，多个标签用#隔开" className="mt-3 p-2 border border-gray-300 rounded-md bg-blue-50" />
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-m font-bold text-gray-600 transition-colors hover:bg-gray-200"
          >
            取消
          </button>
          <button
            className={`flex h-10 items-center rounded-lg px-4 text-m font-bold text-white transition-colors ${isFormValid && !isEditing
                ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed'
              }`}
            type="submit"
            disabled={!isFormValid || isEditing}
          >
            {isEditing ? '保存中...' : '保存修改'}
          </button>
        </div>
      </form>
    </div>
  );
}