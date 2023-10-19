import './App.css';
import { Timeline } from './components/timeline/timeline';

function App() {
  return (
    <main className="h-screen p-4">
      <div className="grid h-3/4 grid-cols-[20%_60%_20%]">
        <div className="border-2 border-gray-800">left</div>
        <div className="border-2 border-gray-800">center</div>
        <div className="border-2 border-gray-800">right</div>
      </div>
      <Timeline />
    </main>
  );
}

export default App;
