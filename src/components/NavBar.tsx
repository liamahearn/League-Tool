import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="flex space-x-4">
      <Link to="/" className="text-blue-500">
        Home
      </Link>
      <Link to="/summoner/demoSummoner" className="text-blue-500">
        Demo Summoner
      </Link>
    </nav>
  );
}

export default NavBar;
