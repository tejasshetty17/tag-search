import React from "react";
import ReactDOM from "react-dom";

// CONSTANTS
import { CONFIG , CHEESE_LIST} from "../data";

// STYLES
import "./App.css";

import TagSearch from "../components/TagSearch/TagSearch";


const App = () => {
    return (
        <div className="app-wrapper">
          {/* <h1>Tag Search</h1>
          <h2>Search for a tag</h2> */}
          <TagSearch availableTags={CHEESE_LIST} config={CONFIG} />
        </div>
    );
}

export default App;

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<App />, wrapper) : false;
