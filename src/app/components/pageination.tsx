'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const nextPageHandler = () => {
        const params = new URLSearchParams(searchParams);
        params.set('page', (currentPage + 1).toString());
        return `${pathname}?${params.toString()}`;
    }

    const prevPageHandler = () => {
        if ((currentPage - 1) === 0) {
            return '/list';
        } else {
            const params = new URLSearchParams(searchParams);
            params.set('page', (currentPage - 1).toString());
            return `${pathname}?${params.toString()}`;
        }
    }

    return (
        <div className="flex justify-center items-center gap-4">
            {
                currentPage > 1 ?
                    <Link href={prevPageHandler()}>
                        <ArrowLeftIcon className="w-6 h-6 cursor-pointer" />
                    </Link>
                    : null
            }
            <p className="text-black text-lg">第 {currentPage} 页</p>
            {
                currentPage < totalPages ? 
                <Link href={nextPageHandler()}>
                    <ArrowRightIcon className="w-6 h-6 cursor-pointer" />
                </Link>
                 : null
            }
        </div>
    );
}
