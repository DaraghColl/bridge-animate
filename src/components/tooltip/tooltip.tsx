import { FC, ReactNode } from 'react';

interface TooltipProps {
  message: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  children: ReactNode;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Tooltip: FC<TooltipProps> = (props) => {
  const { message, position, children } = props;
  return (
    <div className="group relative flex">
      {children}
      <span
        className={classNames(
          'absolute scale-0 whitespace-nowrap rounded bg-dark-primary p-2 text-xs text-white transition-all group-hover:scale-100 dark:bg-white dark:text-dark-primary',
          position === 'top' ? 'bottom-8' : '',
          position === 'bottom' ? 'right-[-3rem] top-8' : '',
          position === 'left' ? 'right-8' : '',
          position === 'right' ? 'right-8' : '',
        )}
      >
        {message}
      </span>
    </div>
  );
};

export { Tooltip };
