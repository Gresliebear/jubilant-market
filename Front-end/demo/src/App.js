import logo from './logo.svg';
import './App.css';

function App() {

// you can a javascript 5 differents or more 
  
  const handleSubmit = () => {

    console.log("heello")
  }

  
  return (
    // JSX 
    <div className="App">
    <h1 className="title"> Upload Your Claim Medical</h1>
{/* add css react */}
    <p> How much is your claim?</p>

  {/* Form basically sends web request to a server
  Wheres the server ? IP:port */}
    <form method="POST"> 
    <input type="text"/> 

   
    </form>
    <button onClick={handleSubmit}> Submit Claim</button>
    

    </div>
  );
}

export default App;
