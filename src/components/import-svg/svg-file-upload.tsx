import { ChangeEvent, Dispatch, FC, useEffect } from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

interface SVGFileUploadProps {
  setFile: Dispatch<React.SetStateAction<File | null>>;
}
const SVGFileUpload: FC<SVGFileUploadProps> = (props) => {
  const { setFile } = props;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file.type !== 'image/svg+xml') {
      console.error('file type is not svg');
      return;
    }

    setFile(file);
  };

  useEffect(() => {
    const dropContainer = document.getElementById('drop_container');
    if (!dropContainer) return;

    dropContainer.addEventListener(
      'dragover',
      (e) => {
        // prevent default to allow drop
        e.preventDefault();
      },
      false,
    );

    dropContainer.addEventListener('drop', (e) => {
      e.preventDefault();
      dropContainer.classList.remove('drag-active');
      if (e.dataTransfer) {
        const file = e.dataTransfer.files[0];
        if (file.type !== 'image/svg+xml') {
          console.error('file type is not svg');
          return;
        }

        setFile(file);
      }
    });
  }, [setFile]);

  return (
    <div className="flex w-full items-center justify-center">
      <label
        id="drop_container"
        htmlFor="dropzone-file"
        className="bg-light-secondary hover:bg-slate-light flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 dark:bg-dark-secondary dark:hover:border-gray-500 dark:hover:bg-dark-primary"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <CloudArrowUpIcon className="mb-4 h-14 w-14 text-dark-primary dark:text-white" />

          <p className="mb-2 text-sm text-dark-primary dark:text-white">
            <span className="font-semibold">Click to upload SVG</span> or drag and drop
          </p>
        </div>
        <input id="dropzone-file" type="file" accept="image/svg+xml" className="hidden" onChange={handleFileChange} />
      </label>
    </div>
  );
};

export { SVGFileUpload };
