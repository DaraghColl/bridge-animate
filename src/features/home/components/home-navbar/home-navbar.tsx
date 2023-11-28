import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ViewfinderCircleIcon } from '@heroicons/react/24/outline';

const HomeNavbar: FC = () => {
  return (
    <nav className="fixed z-50 flex w-full items-center justify-around bg-transparent p-4">
      <Link to="/">
        <ViewfinderCircleIcon className="h-6 w-6 cursor-pointer text-white" />
      </Link>
      <div className="flex gap-4">
        <Link to="/projects" className="cursor-pointer text-xl tracking-wider text-white">
          <span>projects</span>
        </Link>
        <Link to="#" className="cursor-pointer text-xl tracking-wider text-white">
          <span>features</span>
        </Link>
        <Link to="#" className="cursor-pointer text-xl tracking-wider text-white">
          <span>tour app</span>
        </Link>
      </div>
    </nav>
  );
};

export { HomeNavbar };
