import React, { ReactNode } from 'react';

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mx-auto pt-24">
      { children }
    </div>
  );
};

export default Container;