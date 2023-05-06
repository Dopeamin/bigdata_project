import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  SetStateAction,
} from "react";
import DataTable, { createTheme } from "react-data-table-component";

const CustomDataTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    console.log("state", selectedRows);
  }, [selectedRows]);

  const handleButtonClick = () => {
    console.log("clicked");
  };

  const columns = useMemo(
    () => [
      {
        name: "Name",
        selector: (row: { name: any }) => row.name,
        sortable: true,
        grow: 2,
      },
      {
        name: "Type",
        selector: (row: { type: any }) => row.type,
        sortable: true,
      },
    ],
    []
  );
  createTheme(
    "solarized",
    {
      text: {
        primary: "rgb(156,163,175)",
        secondary: "rgb(156,163,175)",
      },
      background: {
        default: "transparent",
      },
      pagination: {
        text: "rgb(156,163,175)",
      },
      context: {
        background: "transparent",
        text: "#FFFFFF",
      },
      divider: {
        default: "#e5e7eb",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  const customStyle = {
    headCells: {
      style: {
        color: "rgb(51,65,85)",
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    cells: {
      style: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
  };

  return (
    <div className="flex flex-col py-10">
      <div className="flex-1 flex flex-col">
        <p className="text-gray-400 text-xs font-normal">DataTable</p>
        <h1 className="text-2xl font-semibold text-slate-700">
          Most Common values per country
        </h1>
        <DataTable
          customStyles={customStyle}
          columns={columns}
          theme="solarized"
          pagination
          data={[{ name: "Amine", type: "Administrator" }]}
        />
      </div>
      <div>
        <p className="text-gray-400 text-xs font-normal">Ranks</p>
        <h1 className="text-2xl font-semibold text-slate-700">
          Billionaires Ranked
        </h1>
        <DataTable
          customStyles={customStyle}
          columns={columns}
          theme="solarized"
          pagination
          data={[{ name: "Amine", type: "Administrator" }]}
        />
      </div>
    </div>
  );
};

export default CustomDataTable;
