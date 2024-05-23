import React, { ReactNode } from 'react';

const AnimationContainer = ({ children }: { children: ReactNode }) => {
    return (
        <div className='w-[100%] bg-primary-foreground px-4 py-3'>
            {children}
        </div>
    );
};

export default AnimationContainer;
