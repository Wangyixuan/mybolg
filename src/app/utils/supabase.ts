'use server';
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation';

const supabase = createClient('https://ktotndhdxyblhyseaowp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0b3RuZGhkeHlibGh5c2Vhb3dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxMzM0MjgsImV4cCI6MjA3NTcwOTQyOH0.IvsrP7tovVT500ZQYrqXgXidLD_4u_I3k84tmcqGXRk')

export async function createPost(formData: FormData) {

    try {
        // 获取标签数据并正确处理为 PostgreSQL jsonb[] 格式
        let tags = [];
        const selectedTags = formData.get('selectedTags');
        
        if (selectedTags) {
            try {
                // 如果是字符串，尝试解析为数组
                if (typeof selectedTags === 'string') {
                    tags = JSON.parse(selectedTags);
                }
                
                // 确保 tags 是数组
                if (!Array.isArray(tags)) {
                    tags = [tags];
                }
            } catch (e) {
                console.error('Error parsing tags:', e);
                tags = [];
            }
        }
        
        const { data, error } = await supabase
        .from('posts')
        .insert([
          { 
              title: formData.get('title'), 
              content: formData.get('content'), 
              tags: tags  // PostgreSQL 会自动处理数组为 jsonb[]
          },
        ])
        if (error) {
            throw error
        }
                // 成功后重定向到首页
        redirect('/');        
    } catch (error) {
        console.error('Error creating post:', error)
        throw error
    }
}

export async function getLatestPosts() {
    try {
        const { data, error } = await supabase
        .from('posts')
        .select('*')
        .limit(5)
        .order('created_at', { ascending: false })
        if (error) {
            throw error
        }
        return data
    } catch (error) {
        console.error('Error getting posts:', error)
        throw error
    }
}

export async function getPosts(page: number) {
    const limit = 5
    console.log(page)
    try {
        const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        if (error) {
            throw error
        }

        const totalPage = Math.ceil(data.length / limit)
        
        return {
            data: data.slice(page * limit, (page + 1) * limit),
            totalPage
        }

    } catch (error) {
        console.error('Error getting posts:', error)
        throw error
    }
}

export async function getPostById(id: number) {
    try {
        const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        if (error) {
            throw error
        }
        return data[0]
    } catch (error) {
        console.error('Error getting post:', error)
        throw error
    }
}

export async function getCategories() {
    try {
        const { data, error } = await supabase
        .from('categorys')
        .select('*')
        if (error) {
            throw error
        }
            console.log(data);

        return data
    } catch (error) {
        console.error('Error getting categories:', error)
        throw error
    }
}

export async function createCategory(name: string) {
    try {
        const { data, error } = await supabase
        .from('categories')
        .insert([
          { name },
        ])
        if (error) {
            throw error
        }
    } catch (error) {
        console.error('Error creating category:', error)
        throw error
    }
}