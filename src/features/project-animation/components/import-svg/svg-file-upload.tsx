import { ChangeEvent, FC, useCallback, useEffect, useRef } from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

interface SVGFileUploadProps {
  onFileUpload: (file: File) => void;
}

const SVGFileUpload: FC<SVGFileUploadProps> = (props) => {
  const { onFileUpload } = props;
  const dropContainerRef = useRef<HTMLLabelElement>(null);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file.type !== 'image/svg+xml') {
      console.error('file type is not svg');
      return;
    }

    onFileUpload(file);
  };

  const dragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const drop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!e.dataTransfer) return;

      const { files } = e.dataTransfer;

      const file = files[0];
      if (file.type !== 'image/svg+xml') {
        console.error('file type is not svg');
        return;
      }

      if (files && files.length) {
        onFileUpload(file);
      }
    },
    [onFileUpload],
  );

  useEffect(() => {
    const dropContainer = dropContainerRef.current;
    if (!dropContainer) return;
    dropContainer.addEventListener('dragover', dragOver);
    dropContainer.addEventListener('drop', drop);

    return () => {
      dropContainer.removeEventListener('dragover', dragOver);
      dropContainer.removeEventListener('drop', drop);
    };
  }, [drop]);

  return (
    <div className="flex w-full items-center justify-center">
      <label
        ref={dropContainerRef}
        id="drop_container"
        htmlFor="dropzone-file"
        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-light-secondary hover:bg-slate-light dark:border-gray-600 dark:bg-dark-secondary dark:hover:border-gray-500 dark:hover:bg-dark-primary"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <CloudArrowUpIcon className="mb-4 h-14 w-14 text-dark-primary dark:text-white" />

          <p className="mb-2 text-sm text-dark-primary dark:text-white">
            <span className="font-semibold">Click to upload SVG</span> or drag and drop
          </p>
        </div>
        <input id="dropzone-file" type="file" accept="image/svg+xml" className="hidden" onChange={onFileChange} />
      </label>
    </div>
  );
};

export { SVGFileUpload };
