import { FC } from 'react';
import LandingImageDark from '@assets/landing-image--dark.png';
import LandingImageLight from '@assets/landing-image--light.png';
import { useThemeContext } from '@shared/state/theme/theme';

const Landing: FC = () => {
  const { theme } = useThemeContext();

  return (
    <div className="h-screen bg-light-secondary pt-20 text-dark-primary dark:bg-dark-secondary dark:text-white">
      <div className="absolute isolate px-6 pt-14 lg:px-8">
        <div className="absolute -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
      <div className="flex h-full justify-center">
        <div className="mt-10 text-center">
          <h1 className="mb-10 animate-fade-in-up text-5xl font-semibold opacity-0">Bridge</h1>
          <h2 className="mb-10 animate-fade-in-up text-xl font-thin opacity-0">
            simplify your animation process from design to code
          </h2>
          <div className="max-w-screen-lg animate-fade-in-up px-28 opacity-0">
            <img
              src={theme === 'dark' ? LandingImageDark : LandingImageLight}
              alt="landing image"
              className="rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Landing };
