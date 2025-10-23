import { type } from "os";

export type Post = {
    id: number;
    title: string;
    content: string;
    created_at: number;
    updated_at: number;
    tags: string[];
}

export type Category = {
    id: number;
    name: string;
    isSelected: boolean;
}

export type CategoryInfo =  {
    name: string;
    postCount: number;
}