import React, { FC } from 'react';


interface ModalProps {

}

export const Modal: FC<ModalProps> = ({ children }) => {
    return (
        <>
            <div className='modal'>
                { children }
            </div>
            <div className='modal__backdrop'>

            </div>
        </>
    )
}
