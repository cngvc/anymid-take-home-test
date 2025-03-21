import { useEffect, useState } from "react";
import { IAggregated } from "./types";
import axios from "axios";
import LatestNews from "./latest-news";
import Weather from "./weather";
import Crypto from "./crypo";

const SERVER_URL = "http://localhost:3001/api/v1";

function App() {
  const [data, $data] = useState<IAggregated | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${SERVER_URL}/aggregated-data`);
      $data(data.metadata);
    };
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen gap-5">
      <div className="hidden lg:flex w-[320px] bg-blue-50"></div>
      <div className="flex-1 grid grid-cols-3 bg-blue-50">
        <Crypto data={data?.crypto || []} />
        <Weather data={data?.weather || []} />
        <LatestNews data={data?.latest_news || []} />
      </div>
    </div>
  );
}

export default App;
