'use client';

import { Loader } from '../loader';

export const LoadingProvider = ({ children, isLoading }: { children: React.ReactNode; isLoading: boolean }) => {
    return (
        <>
            <div style={{ display: isLoading ? 'block' : 'none' }} className="inset-0 w-[100vw] h-[100vh] absolute z-[999]">
                <div className="bg-white opacity-70 w-full h-full"></div>
                <div className="absolute translate-x-1/2 translate-y-1/2 bottom-1/2 right-1/2">
                    <Loader size={'medium'} />
                </div>
            </div>
            <div style={{ display: !isLoading ? 'block' : 'none' }}>{children}</div>
        </>
    );
};
