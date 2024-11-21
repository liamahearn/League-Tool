import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleSearch = (summonerName: string) => {
    navigate(`/summoner/${summonerName}`);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold">League Lookup</h1>
      <input
        type="text"
        placeholder="Enter Summoner Name"
        className="mt-4 p-2 border rounded"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            let inputVal = (e.target as HTMLInputElement).value;
            inputVal = inputVal.toString().replace("#", "-");
            handleSearch(inputVal);
          }
        }}
      />
    </div>
  );
}

export default HomePage;
