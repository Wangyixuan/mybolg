'use server';
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation';

const supabase = createClient('https://ktotndhdxyblhyseaowp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0b3RuZGhkeHlibGh5c2Vhb3dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxMzM0MjgsImV4cCI6MjA3NTcwOTQyOH0.IvsrP7tovVT500ZQYrqXgXidLD_4u_I3k84tmcqGXRk')

export async function createPost(formData: FormData) {
    try {
        // 获取表单数据
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        
        // 获取选中的标签名称
        let categoryNames: string[] = [];
        const categoryNamesStr = formData.get('categoryNames');
        
        if (categoryNamesStr) {
            try {
                categoryNames = JSON.parse(categoryNamesStr as string);
            } catch (e) {
                console.error('Error parsing categoryNames:', e);
            }
        }

        // 创建文章
        const { data: postData, error: postError } = await supabase
            .from('posts')
            .insert([
                { title, content }
            ])
            .select();
            
        if (postError) {
            throw postError;
        }
        
        // 成功后重定向到首页
        redirect('/');        
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
}