import React, { useState } from "react";

function App() {
  const [component, setComponent] = useState("Component1");

  const handleButtonClick = () => {
    if (component === "Component1") {
      setComponent("Component2");
    } else {
      setComponent("Component1");
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Move Component</button>
      {component === "Component1" ? <Component1 /> : <Component2 />}
    </div>
  );
}

function Component1() {
  return <div>This is Component 1</div>;
}

function Component2() {
  return <div>This is Component 2</div>;
}

export default App;

//In this example, we use the useState hook to keep track of the component state, which is initially set to "Component1". The handleButtonClick function is called when the button is clicked and updates the component state to toggle between "Component1" and "Component2". Finally, we conditionally render the appropriate component based on the component state.
