import { BackEndService } from "@/services/backend.service";
import { useState, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import { CommonValuesDTO } from "../models/commonValues";
import { CommonValuesByCountryDTO } from "../models/commonValuesByCountry.model";
import { PersonDto } from "../models/person.model";

export const useSocket = () => {
  const [data, setData] = useState<PersonDto[]>([]);
  const [countryData, setCountryDataData] = useState<
    CommonValuesByCountryDTO[]
  >([]);
  const [commonValues, setCommonValuesData] = useState<CommonValuesDTO>();

  useMemo(() => {
    const socket = io("http://localhost:3004");
    socket.on("data", (data) => {
      setData(data.allData);
      setCountryDataData(data.commonValuesByCountry);
      setCommonValuesData(data.commonValues[data.commonValues.length - 1]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return { data, countryData, commonValues };
};
