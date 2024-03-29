import React, { ReactNode } from 'react';

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[474px] mx-auto px-6 py-24 md:py-[120px]">
      {children}
    </div>
  );
};

export default Container;
