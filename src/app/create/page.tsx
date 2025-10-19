'use client';

import Link from "next/link";
import { createPost, getCategories } from "@/app/utils/supabase";
import Tags from "@/app/components/tags";
import { useState, useEffect } from "react";
import { Category } from "@/app/utils/definitions";

export default function Create() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedTagNames, setSelectedTagNames] = useState<string[]>([]);
  
  useEffect(() => {
    // 获取分类数据
    async function fetchCategories() {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    }
    
    fetchCategories();
  }, []);
  
  return (
    <div className="bg-white w-full p-4 rounded-md">
      <form action={createPost}>
        <div className="flex flex-col justify-center rounded-md">
          <label htmlFor="title" className="text-black text-xl font-bold">
            Post Title:
          </label>
          <input
            name="title"
            id="title"
            type="text"
            className="mt-2 p-2 border border-gray-300 rounded-md bg-blue-50"
          />
        </div>
        <div className="flex flex-col justify-center rounded-md mt-4">
          <label htmlFor="content" className="text-black text-xl font-bold">
            Content:
          </label>
          <textarea
            name="content"
            id="content"
            rows={4}
            className="mt-2 p-2 border border-gray-300 rounded-md bg-blue-50"
          />
        </div>
        <div className="flex flex-col justify-center rounded-md mt-4">
          <label htmlFor="tags" className="text-black text-xl font-bold">
            Category:
          </label>
          <Tags tags={categories} onTagsChange={setSelectedTagNames} />
          <input type="hidden" name="selectedTags" value={JSON.stringify(selectedTagNames)} />
        </div>
        <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-m font-bold text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <button className="flex h-10 items-center rounded-lg bg-blue-100 px-4 text-m font-bold text-white transition-colors hover:bg-blue-400 cursor-pointer" type="submit">Create Post</button>
      </div>
      </form>
    </div>
  );
}