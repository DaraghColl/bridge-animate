import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ViewfinderCircleIcon } from '@heroicons/react/24/outline';
import { ThemeToggle } from '@/shared/components/theme-toggle/theme-toggle';

const HomeNavbar: FC = () => {
  return (
    <nav className="fixed z-50 flex w-full items-center justify-around bg-transparent p-4 text-dark-primary dark:text-white">
      <Link to="/">
        <ViewfinderCircleIcon className="h-6 w-6 cursor-pointer" />
      </Link>
      <div className="flex gap-4">
        <Link to="/projects" className="cursor-pointer text-xl tracking-wider">
          <span>projects</span>
        </Link>
        <Link to="#" className="cursor-pointer text-xl tracking-wider">
          <span>features</span>
        </Link>
        <Link to="#" className="cursor-pointer text-xl tracking-wider">
          <span>tour app</span>
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export { HomeNavbar };
