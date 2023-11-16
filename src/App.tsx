import './App.css';
import { Timeline } from './components/timeline/timeline';
import { ElementList } from './components/element-list/element-list';
import { Canvas } from './components/canvas/canvas';
import { StyleControls } from './components/style-controls/style-controls';
import { Layers } from './components/layers/layers';

function App() {
  return (
    <main className="flex h-screen flex-col gap-4 bg-slate-100 p-4 text-black dark:bg-dark-primary dark:text-white">
      <div className="flex h-2/3 min-h-0 flex-row gap-4">
        <div className="basis-1/5 overflow-scroll rounded-md bg-white dark:bg-dark-secondary">
          <ElementList />
        </div>
        <Canvas />
        <div
          id="controls"
          className="w-[240px] min-w-[240px] basis-1/5 overflow-scroll rounded-md bg-white dark:bg-dark-secondary"
        >
          <StyleControls />
        </div>
      </div>
      <div className="flex h-1/3 gap-4 rounded-md">
        <div className="basis-1/4 overflow-scroll bg-white p-2 text-black dark:bg-dark-secondary dark:text-white">
          <Layers />
        </div>
        <Timeline />
      </div>
    </main>
  );
}

export default App;
