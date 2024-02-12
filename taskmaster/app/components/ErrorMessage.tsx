import React, { PropsWithChildren, ReactNode } from 'react';

const ErrorMessage = ({ children }: PropsWithChildren) => {
    if (!children) {
        return null;
    }

    return (
        <p className="bg-red-500">{children}</p>
  );
}

export default ErrorMessage;