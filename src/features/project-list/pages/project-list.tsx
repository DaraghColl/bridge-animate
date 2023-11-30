import { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PencilSquareIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { ProjectsListNavbar } from '../components/projects-list-navbar/projects-list-navbar';
import { EmptyList } from '../components/empty-list/empty-list';
import { StandardDialog } from '@/shared/components/standard-dialog/standard-dialog';
import { ListWithAnimations } from '../components/list-with-animations/lis-with-animations';
import { Button } from '@/shared/components/button/button';

export interface AnimationProject {
  id: string;
  name: string;
  createdAt: Date;
}

const animationProjects: AnimationProject[] = [];

const ProjectList: FC = () => {
  const [newAnimationDialogOpen, setNewAnimationDialogOpen] = useState(false);
  const [newAnimationName, setNewAnimationName] = useState('');
  const createNewAnimationProject = () => {
    const newAnimationProject: AnimationProject = {
      id: uuidv4(),
      createdAt: new Date(),
      name: newAnimationName,
    };

    animationProjects.push(newAnimationProject);

    setNewAnimationDialogOpen(false);
    setNewAnimationName('');
  };

  return (
    <main className="flex h-screen flex-col gap-4 bg-light-secondary text-dark-primary dark:bg-dark-secondary dark:text-white">
      <ProjectsListNavbar />
      <div className="mx-auto mt-10 w-full max-w-screen-lg p-4">
        {animationProjects.length <= 0 && <EmptyList createNewAnimation={setNewAnimationDialogOpen} />}
        {animationProjects.length > 0 && (
          <ListWithAnimations animationProjects={animationProjects} createNewAnimation={setNewAnimationDialogOpen} />
        )}
      </div>
      <StandardDialog
        title="Give your new animation a name"
        openDialog={newAnimationDialogOpen}
        onDialogClose={() => setNewAnimationDialogOpen(false)}
      >
        <div className="mb-4 flex items-center gap-2 border-b-2">
          <PencilSquareIcon className="h-5 w-5" />
          <input
            aria-label="new animation name"
            name="new-animation-name"
            type="text"
            autoComplete="off"
            className="w-full rounded-sm bg-light-secondary px-2 py-2 text-dark-primary outline-none dark:bg-dark-secondary dark:text-gray-100"
            value={newAnimationName}
            onChange={(e) => setNewAnimationName(e.target.value)}
          />
        </div>
        <Button variant="filled" color="accent" rounded="md" onClick={createNewAnimationProject}>
          <div className="flex items-center gap-2">
            <PlusCircleIcon className="h-4 w-4 text-white" />
            <span>create</span>
          </div>
        </Button>
      </StandardDialog>
    </main>
  );
};

export { ProjectList };
