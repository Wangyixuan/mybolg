'use client';

import { useState } from 'react';
import { Post } from '@/app/utils/definitions';
import EditForm from './EditForm';

interface EditButtonProps {
  post: Post;
}

export default function EditButton({ post }: EditButtonProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
              <div 
          style={{ 
            position: 'fixed', 
            inset: 0, 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            zIndex: 50, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            transition: 'opacity 300ms'
          }}
        >
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">编辑文章</h2>
            <EditForm post={post} onCancel={handleCancel} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleEdit}
      className="inline-flex items-center justify-center p-2 text-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white transition-colors"
    >
      编辑
    </button>
  );
}