'use server';
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation';
import { CategoryInfo } from './definitions';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!
)

// 创建文章
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

        const customTags = formData.get('customTags');
        if (customTags && typeof customTags === 'string' && customTags.length > 0) {
            let customTagArray = customTags.split('#');
            customTagArray = customTagArray.filter(tag => tag.trim() !== '');
            // 将自定义标签创建调用createCategory函数
            await createCategory(customTagArray);
            // 与tags比较，避免重复
            tags.push(...customTagArray.filter(tag => !tags.includes(tag)));
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

// 获取最新的5篇文章 首页使用
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

export async function getAllPosts() {
    try {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
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

// 获取文章及分页 全部文章使用
export async function getPosts(page: number, pageSize: number = 5) {
    const limit = pageSize

    const allPosts = await getAllPosts();

    const totalPage = Math.ceil(allPosts.length / limit)

    return {
        data: allPosts.slice(page * limit, (page + 1) * limit),
        totalPage
    }
}



// 获取文章详情
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

// 获取所有分类
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

// 查询分类是否存在
export async function getCategoryByName(name: string) {
    try {
        const { data, error } = await supabase
            .from('categorys')
            .select('*')
            .eq('name', name)
        if (error) {
            throw error
        }
        return data[0]
    } catch (error) {
        console.error('Error getting category:', error)
        throw error
    }
}

// 创建分类
export async function createCategory(names: string[]) {
    // 检查是否已存在相同名称的分类
    for (const name of names) {
        const existingCategory = await getCategoryByName(name);
        if (existingCategory) {
            throw new Error(`分类名称 ${name} 已存在`);
        }

        try {
            const { data, error } = await supabase
                .from('categorys')
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
}

// 获取分类及文章数量
export async function getAllCategoryInfo() {
    // 获取全部文章 
    const posts = await getAllPosts();
    // 统计每个分类下的文章数量
    const categoryInfo: CategoryInfo[] = [];
    for (const post of posts) {
        if (post.tags && post.tags.length > 0) {
           for (const tag of post.tags) {
                const existingCategory = categoryInfo.find(item => item.name === tag);
                if (existingCategory) {
                    existingCategory.postCount++;
                } else {
                    categoryInfo.push({ name: tag, postCount: 1});  
                }
           }
        }
    }
    // 按照数量排序 数量多的排第一
    categoryInfo.sort((a, b) => b.postCount - a.postCount);
    return categoryInfo;
}

export async function getPostsByCategory(categoryName: string) {
    try {
        // 获取所有文章，然后在JavaScript中过滤
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false })
            
        if (error) {
            throw error
        }
        
        // 在JavaScript中过滤包含指定分类的文章
        const filteredPosts = data?.filter(post => {
            if (!post.tags) return false;
            return post.tags.includes(categoryName);
        }) || [];
        
        return filteredPosts
    } catch (error) {
        console.error('Error getting posts by category:', error)
        return []
    }
}