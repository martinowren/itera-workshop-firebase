import React, { FC } from 'react';
import { Button } from '../button/Button';

interface ModalProps {
	setModalOpen: (isOpen: boolean) => void;
}

export const Modal: FC<ModalProps> = ({ children, setModalOpen }) => {
	return (
		<>
			<div className="modal">
				<Button
					className="modal__button"
					onClick={() => setModalOpen(false)}
				>
					X
				</Button>
				{children}
			</div>
			<div className="modal__backdrop"></div>
		</>
	);
};
