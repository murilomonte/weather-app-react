import Home from "./Pages/Home";
import Header from "./Components/_partials/Header";
import { WeatherProvider } from "./Context/WeatherContext";
import './App.css';

const App = () => {
  return (
    <WeatherProvider>
      <div className="container">
        <Header />
        <Home />
      </div>
    </WeatherProvider>
  );
};

export default App;
