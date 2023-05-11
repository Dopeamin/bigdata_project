"use client";
import Button from "@/components/shared/button";
import Header from "@/components/shared/header";
import Input from "@/components/shared/input";
import { useState } from "react";

export default function Form() {
  const [rank, setRank] = useState("");
  const [personName, setPersonName] = useState("");
  const [age, setAge] = useState("");
  const [finalWorth, setFinalWorth] = useState("");
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [organization, setOrganization] = useState("");
  const [selfMade, setSelfMade] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [title, setTitle] = useState("");
  const [philanthropyScore, setPhilanthropyScore] = useState("");
  const [bio, setBio] = useState("");
  const [about, setAbout] = useState("");

  const handleRankChange = (event: any) => {
    setRank(event.target.value);
  };

  const handlePersonNameChange = (event: any) => {
    setPersonName(event.target.value);
  };

  const handleAgeChange = (event: any) => {
    setAge(event.target.value);
  };

  const handleFinalWorthChange = (event: any) => {
    setFinalWorth(event.target.value);
  };

  const handleCategoryChange = (event: any) => {
    setCategory(event.target.value);
  };

  const handleSourceChange = (event: any) => {
    setSource(event.target.value);
  };

  const handleCountryChange = (event: any) => {
    setCountry(event.target.value);
  };

  const handleStateChange = (event: any) => {
    setState(event.target.value);
  };

  const handleCityChange = (event: any) => {
    setCity(event.target.value);
  };

  const handleOrganizationChange = (event: any) => {
    setOrganization(event.target.value);
  };

  const handleSelfMadeChange = (event: any) => {
    setSelfMade(event.target.value);
  };

  const handleGenderChange = (event: any) => {
    setGender(event.target.value);
  };

  const handleBirthDateChange = (event: any) => {
    setBirthDate(event.target.value);
  };

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handlePhilanthropyScoreChange = (event: any) => {
    setPhilanthropyScore(event.target.value);
  };

  const handleBioChange = (event: any) => {
    setBio(event.target.value);
  };

  const handleAboutChange = (event: any) => {
    setAbout(event.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = {
      rank: rank,
      personName: personName,
      age: age,
      finalWorth: finalWorth,
      category: category,
      source: source,
      country: country,
      state: state,
      city: city,
      organization: organization,
      selfMade: selfMade,
      gender: gender,
      birthDate: birthDate,
      title: title,
      philanthropyScore: philanthropyScore,
      bio: bio,
      about: about,
    };

    let jsonString = "{\r\n  ";
    for (const [key, value] of Object.entries(formData)) {
      jsonString += `"${key}": "${value}",\r\n  `;
    }
    jsonString = jsonString.slice(0, -4) + "\r\n}";

    const options = {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: jsonString,
    };

    fetch("http://localhost:3002/ingest", options)
      .then((response) => {
        console.log(response);
        // handle success or error response
      })
      .catch((error) => {
        console.error(error);
        // handle network error
      });
  };

  return (
    <main>
      <Header />

      <div className="flex flex-row justify-center w-full">
        <div className="max-w-6xl w-full px-4 py-6">
          <div className="flex flex-col my-10 w-full gap-2">
            <p className="text-gray-400 text-xs font-normal">Simple Form</p>
            <h1 className="text-slate-700 text-4xl font-semibold">
              Add new billionaires to our database
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-6">
              <Input
                label={"Rank"}
                placeholder={"Enter rank"}
                value={rank}
                type={"number"}
                onChange={handleRankChange}
              />
              <Input
                label={"Person Name"}
                placeholder={"Enter name"}
                value={personName}
                type={"text"}
                onChange={handlePersonNameChange}
              />
              <Input
                label={"Age"}
                placeholder={"Enter age"}
                value={age}
                type={"number"}
                onChange={handleAgeChange}
              />
              <Input
                label={"Final Worth"}
                placeholder={"Enter worth"}
                value={finalWorth}
                type={"number"}
                onChange={handleFinalWorthChange}
              />
              <Input
                label={"Category"}
                placeholder={"Enter category"}
                value={category}
                type={"text"}
                onChange={handleCategoryChange}
              />
              <Input
                label={"Source"}
                placeholder={"Enter source"}
                value={source}
                type={"text"}
                onChange={handleSourceChange}
              />
              <Input
                label={"Country"}
                placeholder={"Enter country"}
                value={country}
                type={"text"}
                onChange={handleCountryChange}
              />
              <Input
                label={"State"}
                placeholder={"Enter state"}
                value={state}
                type={"text"}
                onChange={handleStateChange}
              />
              <Input
                label={"City"}
                placeholder={"Enter city"}
                value={city}
                type={"text"}
                onChange={handleCityChange}
              />
              <Input
                label={"Organization"}
                placeholder={"Enter organization"}
                value={organization}
                type={"text"}
                onChange={handleOrganizationChange}
              />
              <Input
                label={"Self Made"}
                placeholder={"Enter self made"}
                value={selfMade}
                type={"text"}
                onChange={handleSelfMadeChange}
              />
              <Input
                label={"Gender"}
                placeholder={"Enter gender"}
                value={gender}
                type={"text"}
                onChange={handleGenderChange}
              />
              <Input
                label={"Birth Date"}
                placeholder={"Enter birth date"}
                value={birthDate}
                type={"text"}
                onChange={handleBirthDateChange}
              />
              <Input
                label={"Title"}
                placeholder={"Enter title"}
                value={title}
                type={"text"}
                onChange={handleTitleChange}
              />
              <Input
                label={"Philanthropy Score"}
                placeholder={"Enter score"}
                value={philanthropyScore}
                type={"number"}
                onChange={handlePhilanthropyScoreChange}
              />
              <Input
                label={"Bio"}
                placeholder={"Enter bio"}
                value={bio}
                type={"text"}
                onChange={handleBioChange}
              />
              <Input
                label={"About"}
                placeholder={"Enter about"}
                value={about}
                type={"text"}
                onChange={handleAboutChange}
              />
            </div>
            <button className="mt-10 px-3 py-3 rounded-lg bg-blue-400 text-blue-900 w-full">
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
