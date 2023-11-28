import { FC } from 'react';
import { Landing } from '../components/landing/landing';
import { HomeNavbar } from '../components/home-navbar/home-navbar';

const Home: FC = () => {
  return (
    <div>
      <HomeNavbar />
      <Landing />
    </div>
  );
};

export { Home };
