import React from 'react';

interface ModalProps {
  children?: React.ReactNode;
  closeModal: () => void;
  title?: string;
}

const FlexModal: React.FC<ModalProps> = ({ children, closeModal, title }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center'>
      <div className='bg-white p-8 rounded relative'>
        {title && (
          <h2 className='text-xl font-bold mb-4'>{title}</h2>
        )}
        <button
          onClick={closeModal}
          className='absolute top-2 right-2 text-gray-500'
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default FlexModal;