import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Board from './Board'

function App() {
  return (
    <div className="App">
      <Board nrows={5} ncols={5} chanceLightStartsOn={0.4} />
    </div>
  );
}

export default App;
