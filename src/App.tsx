import './App.css';
import { Timeline } from './components/timeline/timeline';
import { ElementList } from './components/element-list/element-list';
import { Canvas } from './components/canvas/canvas';
import { Controls } from './components/style-controls/style-controls';

function App() {
  return (
    <main className="flex h-screen flex-col gap-4 bg-dark-primary p-4 text-white">
      <div className="flex h-2/3 flex-row gap-4">
        <div className="basis-1/5 overflow-scroll rounded-md bg-dark-secondary">
          <ElementList />
        </div>
        <Canvas />
        <div id="controls" className="w-[240px] min-w-[240px] basis-1/5 overflow-scroll rounded-md bg-dark-secondary">
          <Controls />
        </div>
      </div>
      <Timeline />
    </main>
  );
}

export default App;
