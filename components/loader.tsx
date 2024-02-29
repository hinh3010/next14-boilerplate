'use client';

import { Loader2 } from 'lucide-react';

interface Props {
    size?: number | 'small' | 'medium' | 'large';
}

export const Loader = ({ size = 'small' }: Props) => {
    const _size = typeof size === 'number' ? size : size === 'small' ? 10 : size === 'medium' ? 16 : size === 'large' ? 20 : 10;
    return <Loader2 className="animate-spin text-sky-700" style={{ width: _size * 4 + 'px', height: _size * 4 + 'px' }} />;
};
