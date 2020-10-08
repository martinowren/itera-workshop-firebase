import React, { FC } from 'react';

export type ButtonProps = {
  onClick: (event: React.MouseEvent) => void;
  className?: string;
  size?: 'small';
};
export const Button: FC<ButtonProps> = ({
  onClick,
  className,
  children,
  size,
}) => {
  const sizeClass = size ? `button--size-${size}` : '';
  return (
    <button
      className={`button ${className ? className : ''} ${sizeClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
