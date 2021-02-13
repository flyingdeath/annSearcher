
import './App.css';
import { List } from './components/list'
import { Search } from './components/searchList'
import './svginit_defaults.js'
function App() {
  return (
    <div className="App">
      <h1 class="Header" >Anime News Network Searcher </h1>
      <Search />
      <div id="metadataExtrenalContainer"></div>
      <List /></div>
  );
}

export default App;
