import "./App.css";
import Prices from "./prices";

function App() {
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Prices />
      </div>
    </div>
  );
}

export default App;
