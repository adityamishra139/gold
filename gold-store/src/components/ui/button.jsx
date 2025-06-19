import React from "react";
import { clsx } from "clsx";

const Button = ({ className, children, ...props }) => {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-md hover:bg-amber-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
