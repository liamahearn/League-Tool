import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

// Components
import NavBar from "../components/NavBar";

function SummonerPage() {
  const [playerInfo, setPlayerInfo] = useState({
    account: {
      puuid: "",
      gameName: "",
      tagLine: "",
    },
    summoner: {
      id: "",
      accountId: "",
      puuid: "",
      profileIconId: "",
      revisionDate: "",
      summonerLevel: "",
    },
  });

  // get requested user from URL, for use in API calls
  const location = useLocation();
  const path = location.pathname;
  const usernameString = path.slice(path.lastIndexOf("/") + 1);

  const [playerInfoLoading, setPlayerInfoLoading] = useState(true);

  useEffect(() => {
    const fetchPlayerInfo = async () => {
      setPlayerInfoLoading(true);
      try {
        const response = await fetch(
          `/api/summoner?playerId=${usernameString}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        //console.log(data);
        setPlayerInfo(data);
      } catch (error) {
        console.error("error fetching data", error);
      } finally {
        setPlayerInfoLoading(false);
      }
    };

    fetchPlayerInfo();
  }, []);

  return (
    <>
      <NavBar />
      <div>
        {playerInfoLoading && (
          <img src="/assets/noicon.jpg" alt="temp icon" className="" />
        )}
        {!playerInfoLoading && (
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/profileicon/${playerInfo.summoner.profileIconId}.png`}
            alt="summoner icon"
            className=""
          />
        )}
        <h1 className="text-3xl font-bold">
          {playerInfoLoading && <>Summoner:</>}
          {!playerInfoLoading && (
            <>
              Summoner: {playerInfo.account.gameName} #
              {playerInfo.account.tagLine}
            </>
          )}
        </h1>
        <p>Level: </p>
        {/* Render match data, etc. */}
      </div>
    </>
  );
}

export default SummonerPage;
