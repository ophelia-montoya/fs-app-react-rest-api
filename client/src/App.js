import logo from './logo.svg';
import './App.css';


fetch('http://localhost:5000/api/courses')
.then(res => res.json())
.then(courses => {
  console.log(courses)})


function App() {
  return (
    <div>
    
    </div>
  );
}

export default App;
