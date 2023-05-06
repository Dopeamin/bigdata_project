"use client";

import Card from "@/components/shared/cards";
import CustomDataTable from "@/components/shared/dataTable";
import Header from "@/components/shared/header";
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
  Legend,
} from "recharts";
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
  },
];

const rangeData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const radarData = [
  {
    subject: "Math",
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: "Chinese",
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "English",
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Geography",
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: "Physics",
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: "History",
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

const axisTickStyle = {
  fontSize: 12,
};

export default function Home() {
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
                      Most Common Values
                    </h3>
                    <p className="text-gray-400 text-xs font-normal">
                      Compared to last year
                    </p>
                  </div>
                  <div className="h-32 w-full bg-gradient bg-gradient-to-t from-blue-100 to-transparent">
                    <ResponsiveContainer>
                      <LineChart data={rangeData}>
                        <Line
                          type="monotone"
                          dataKey="pv"
                          stroke="#8884d8"
                          strokeWidth={4}
                        />
                        <Line
                          type="monotone"
                          dataKey="uv"
                          stroke="#82ca9d"
                          strokeWidth={4}
                        />
                        <Tooltip />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-row space-between px-6 py-2">
                    <div className="flex-1 min-h-40">
                      <ResponsiveContainer width={200} height={120}>
                        <RadarChart outerRadius={40} data={radarData}>
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
                            name="Mike"
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
                        World Wide Attributes
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
                      Total billionaires in the world <strong>3000</strong>
                    </p>
                  </div>
                  <div className="h-40 w-full">
                    <ResponsiveContainer>
                      <BarChart width={730} height={250} data={data}>
                        <Tooltip />
                        <Bar dataKey="pv" fill="#8884d8" />
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
                        With <strong>2000</strong> billionaires
                      </p>
                    </div>
                    <div className="flex flex-1 flex-col">
                      <p className="text-gray-400 text-xs font-normal">
                        World billionaire to population ratio
                      </p>
                      <h3 className="text-2xl text-slate-700 font-semibold">
                        1/1000000
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
    </main>
  );
}
