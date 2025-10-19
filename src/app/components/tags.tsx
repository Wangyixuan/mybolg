'use client';

import { Category } from "@/app/utils/definitions";
import { useState, useEffect } from "react";

export default function Tags({ tags, onTagsChange }: { 
    tags: Category[],
    onTagsChange?: (selectedTagNames: string[]) => void 
}) {
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

    // 当选中标签变化时，通知父组件
    useEffect(() => {
        if (onTagsChange) {
            // 将选中的ID转换为名称数组
            const selectedNames = selectedTagIds.map(id => {
                const tag = tags.find(t => t.id === id);
                return tag ? tag.name : '';
            }).filter(name => name !== '');
            
            onTagsChange(selectedNames);
        }
    }, [selectedTagIds, onTagsChange, tags]);

    const toggleTag = (tagId: number) => {
        if (selectedTagIds.includes(tagId)) {
            setSelectedTagIds(selectedTagIds.filter(id => id !== tagId));
        } else {
            setSelectedTagIds([...selectedTagIds, tagId]);
        }
    };

    return (
        <div className="flex flex-wrap gap-2 w-full h-8 mt-2">
            {tags.map((tag) => (
                <div 
                    key={tag.id} 
                    className={`cursor-pointer text-sm p-4 rounded-full h-full flex items-center justify-center transition-colors duration-200
                        ${selectedTagIds.includes(tag.id)
                            ? 'bg-blue-500 text-white border border-blue-500' 
                            : 'bg-transparent text-black border border-gray-300'}`}
                    onClick={() => toggleTag(tag.id)}
                >
                    {tag.name}
                </div>
            ))}
        </div>
    );
}