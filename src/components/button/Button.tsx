import React, { FC } from 'react';

export type ButtonProps = {
	onClick: (event: React.MouseEvent) => void;
	className?: string;
};
export const Button: FC<ButtonProps> = ({ onClick, className, children }) => {
	return (
		<button
			className={`button ${className ? className : ''}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
