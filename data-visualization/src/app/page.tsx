"use client";

import Card from "@/components/shared/cards";
import CustomDataTable from "@/components/shared/dataTable";
import Header from "@/components/shared/header";
import LoadingScreen from "@/components/shared/loading";
import {
  LineChart,
  Tooltip,
  Line,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
} from "recharts";
import { useSocket } from "./util/useSocket";

const axisTickStyle = {
  fontSize: 8,
};

export default function Home() {
  const { commonValues, data, isLoading } = useSocket();

  const radarData = commonValues?.category
    .map((category) => {
      return {
        subject: category.value,
        A: category.count,
      };
    })
    .sort((a, b) => b.A - a.A)
    .slice(0, 6);

  const countries = data
    .map((item) => item.country)
    .filter((name, index, currentVal) => currentVal.indexOf(name) === index);

  const blocksData = countries
    .map((value) => {
      const count = data.filter((data) => data.country === value).length;
      return {
        name: value,
        count: count,
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const femaleToMale = countries
    .map((value) => {
      const count = data.filter((data) => data.country === value);
      const countMale = count.filter((data) => data.gender === "M").length;
      const countFemale = count.filter((data) => data.gender === "F").length;
      return {
        name: value,
        countMale,
        countFemale,
      };
    })
    .sort((a, b) => b.countMale - a.countMale)
    .slice(0, 10)
    .sort((a, b) => 0.5 - Math.random());

  return (
    <main>
      <Header />
      <div className="flex flex-row justify-center w-full">
        <div className="max-w-6xl w-full px-4 py-6">
          <div className="flex flex-col my-10 w-full gap-4">
            <p className="text-gray-400 text-xs font-normal">
              Data Visualization
            </p>
            <h1 className="text-slate-700 text-3xl font-semibold">
              Richest Billionaires in the world
            </h1>
          </div>
          <div className="flex flex-row gap-10 items-stretch">
            <div className="flex-1">
              <Card className="pt-6 pb-3">
                <div className="flex flex-col gap-4">
                  <div className="px-10">
                    <h3 className="text-lg text-slate-700 font-semibold">
                      Male to Female Billionaires ration
                    </h3>
                    <p className="text-gray-400 text-xs font-normal">
                      In the top 10 countries
                    </p>
                  </div>
                  <div className="h-32 w-full bg-gradient bg-gradient-to-t from-blue-100 to-transparent">
                    <ResponsiveContainer>
                      <LineChart data={femaleToMale}>
                        <Line
                          type="monotone"
                          dataKey="countMale"
                          stroke="#8884d8"
                          label="name"
                          strokeWidth={4}
                        />
                        <Line
                          type="monotone"
                          dataKey="countFemale"
                          label="name"
                          stroke="#82ca9d"
                          strokeWidth={4}
                        />
                        <XAxis dataKey={"name"} height={0} />

                        <Tooltip label="name" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-row space-between px-6 py-2">
                    <div className="flex-1 min-h-40">
                      <ResponsiveContainer width={200} height={120}>
                        <RadarChart outerRadius={35} data={radarData}>
                          <PolarGrid />
                          <PolarAngleAxis
                            dataKey="subject"
                            tick={axisTickStyle}
                          />
                          <PolarRadiusAxis
                            angle={30}
                            domain={[0, 150]}
                            tick={axisTickStyle}
                          />
                          <Radar
                            name="Count"
                            dataKey="A"
                            stroke="#8884d8"
                            fill="#8884d8"
                            fillOpacity={0.6}
                          />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="flex flex-1 flex-col">
                      <p className="text-gray-400 text-xs font-normal">
                        Some of the most common
                      </p>
                      <h3 className="text-2xl text-slate-700 font-semibold">
                        World Wide Categories
                      </h3>
                      <p className="text-gray-400 text-base font-normal">
                        Of Billionaires
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="flex-1">
              <Card className="py-6">
                <div className="flex flex-col gap-4">
                  <div className="px-8">
                    <h3 className="text-xl text-slate-700 font-semibold">
                      Countries with the richest people
                    </h3>
                    <p className="text-gray-400 text-xs font-normal">
                      Total billionaires considered
                      <strong>{` ${data.length - 1}`}</strong>
                    </p>
                  </div>
                  <div className="h-40 w-full">
                    <ResponsiveContainer>
                      <BarChart width={730} height={250} data={blocksData}>
                        <Tooltip />
                        <XAxis dataKey="name" tick={axisTickStyle} height={0} />
                        <Bar dataKey="count" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-row w-full pt-4 px-8 gap-6 space-between">
                    <div className="flex flex-1 flex-col">
                      <p className="text-gray-400 text-xs font-normal">
                        Country with most billionaires
                      </p>
                      <h3 className="text-2xl text-slate-700 font-semibold">
                        United States
                      </h3>
                      <p className="text-gray-400 text-base font-normal">
                        With <strong>{blocksData[0]?.count}</strong>{" "}
                        billionaires
                      </p>
                    </div>
                    <div className="flex flex-1 flex-col">
                      <p className="text-gray-400 text-xs font-normal">
                        World billionaire to population ratio
                      </p>
                      <h3 className="text-2xl text-slate-700 font-semibold">
                        1/2857142
                      </h3>
                      <p className="text-gray-400 text-base font-normal">
                        Billionaire to each person
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div>
            <CustomDataTable />
          </div>
        </div>
      </div>

      <LoadingScreen isVisible={isLoading} />
    </main>
  );
}
