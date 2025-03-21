import { useEffect, useMemo, useState } from "react";
import { ICryptoDoc } from "./types";
import Card from "./card";

const Crypto = ({ data }: { data: ICryptoDoc[] }) => {
  const [cryptoData, $cryptoData] = useState<ICryptoDoc[]>(data);
  const [minPrice, $minPrice] = useState<number | "">("");
  const [maxPrice, $maxPrice] = useState<number | "">("");

  useEffect(() => {
    $cryptoData(data);
  }, [data]);

  const filteredData = useMemo(() => {
    return cryptoData.filter((crypto) => {
      const price = crypto.price;
      if (minPrice !== "" && price < minPrice) return false;
      if (maxPrice !== "" && price > maxPrice) return false;
      return true;
    });
  }, [cryptoData, minPrice, maxPrice]);

  return (
    <div className="col-span-1 p-4">
      <h2 className="mb-10">Crypto</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          min={0}
          onChange={(e) =>
            $minPrice(e.target.value ? Number(e.target.value) : "")
          }
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          min={0}
          onChange={(e) =>
            $maxPrice(e.target.value ? Number(e.target.value) : "")
          }
          className="border p-2 w-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        {filteredData.map((crypto) => (
          <Card key={crypto.name}>
            <h3 className="font-semibold">
              {crypto.name}({crypto.symbol})
            </h3>
            <p>{crypto.price}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Crypto;
