import { useState } from "react";
import { useHttpArray } from "../../hooks/useHttp";
import { getAllPosts } from "../../services/posts.service";
import { Bar } from "react-chartjs-2";

import "./graph.css";

const GenerateGraph = () => {
  const [plimit, setPlimit] = useState<number>(50);
  const [pskip, setPskip] = useState<number>(0);
  const { data, error } = useHttpArray<
    Post.PostInterface[],
    { pskip: number; plimit: number }
  >(
    getAllPosts,
    {
      pskip,
      plimit,
    },
    `${plimit} - ${pskip}`
  );
  const counters = data?.reduce(
    (accumulator: any, currentValue: any, index: number) => {
      const postDate = new Date(currentValue.created_at).toDateString();
      if (postDate in accumulator) {
        accumulator[postDate]++;
      } else {
        accumulator[postDate] = 0;
      }
      return accumulator;
    },
    {}
  );

  if (typeof counters !== "object") {
    return <></>;
  }

  return (
    <div className="row justify-content-between">
      <div className="graphContainer bg-white p-3 col-12 col-lg-5 col-md-7">
        <div className=" p-1">
          <Bar
            className="dashboardGraph"
            data={{
              labels: Object.keys(counters),
              datasets: [
                {
                  label: "Videos uploaded every day",
                  backgroundColor: "rgba(255, 206, 86 ,0.8)",
                  data: Object.values(counters),
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            }}
            height={250}
            width={100}
            type="bar"
          />
        </div>
        <p className="text-center text-dark">
          Data of last {data?.length} Posts
        </p>
      </div>
    </div>
  );
};

export default GenerateGraph;
