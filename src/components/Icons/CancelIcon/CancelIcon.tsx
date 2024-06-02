import React from 'react';

const CancelIcon = ({ onClick, className }: { className?: string, onClick?: () => void }) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.225 4.811c-.78-.78-2.045-.78-2.825 0s-.78 2.045 0 2.825L8.675 12 3.4 17.264c-.78.78-.78 2.045 0 2.825s2.045.78 2.825 0L12 15.325l5.264 5.264c.78.78 2.045.78 2.825 0s.78-2.045 0-2.825L15.325 12l5.264-5.264c.78-.78.78-2.045 0-2.825s-2.045-.78-2.825 0L12 8.675 6.736 3.4c-.78-.78-2.045-.78-2.825 0z"
        fill="#313037"
      />
    </svg>
  );
};

export { CancelIcon };
