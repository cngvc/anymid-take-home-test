import { useEffect, useMemo, useState } from "react";
import { IArticleDoc } from "./types";
import Card from "./card";

const LatestNews = ({ data }: { data: IArticleDoc[] }) => {
  const [latestNewsData, $latestNewsData] = useState<IArticleDoc[]>(data);
  const [searchKeyword, $searchKeyword] = useState<string>("");

  useEffect(() => {
    $latestNewsData(data);
  }, [data]);

  const filteredData = useMemo(() => {
    return latestNewsData.filter((article) =>
      article.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [latestNewsData, searchKeyword]);

  return (
    <div className="col-span-1 p-4">
      <h2 className="mb-10">Latest News</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by keyword"
          value={searchKeyword}
          onChange={(e) => $searchKeyword(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        {filteredData.map((article) => (
          <Card key={article.slug}>
            <h3 className="font-semibold">{article.title}</h3>
            <a href={article.url} className="text-blue-500 underline">
              Details
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
