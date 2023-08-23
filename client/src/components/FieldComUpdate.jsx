import { MdClose } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { addSector, updateSector } from "../features/Auth/userapiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const FieldComUpdate = ({ show, setshow, title, data }) => {
  const { loading, sectors } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setname] = useState();

  const [selectedSubsector, setSelectedSubsector] = useState();
  const [selectedMicroSubsector, setselectedMicroSubsector] = useState();
  const [selectedSector, setSelectedSector] = useState();

  const [agree, setagree] = useState(true);

  useEffect(() => {
    setname(data?.name);
    setSelectedSubsector(data?.subsector);
    setselectedMicroSubsector(data?.microsector);
    setSelectedSector(data?.sector);
  }, [data]);
  const nestedData = {
    Manufacturing: {
      "Construction materials": {
        anothersubsector: [],
      },
      "Electronics and Optics": {
        anothersubsector: [],
      },
      "Food and Beverage": {
        anothersubsector: [
          "Bakery & confectionery products",
          "Beverages",
          "Fish & fish products",
          "Meat & meat products",
          "Milk & dairy products",
          "Other",
          "Sweets & snack food",
        ],
      },
      Furniture: {
        anothersubsector: [
          "Bathroom/sauna",
          "Bedroom",
          "Children's room",
          "Kitchen",
          "Living room",
          "Office",
          "Other (Furniture)",
          "Outdoor",
          "Project Furniture",
        ],
      },
      Machinery: {
        anothersubsector: [
          "Machinery components",
          "Machinery equipment/tools",
          "Manufacture of machinery",
          "Maritime",
          "Metal structures",
          "Other",
          "Replair and maintenance service",
        ],
      },
      Metalworking: {
        anothersubsector: [
          "Construction of metal structures",
          "Houses and buildings",
          "Metal products",
          "Metal works",
        ],
      },
      "Plastic and Rubber": {
        anothersubsector: [
          "Packaginh",
          "Plastic goods",
          "Plastic processing technology",
          "Plastic profiles",
        ],
      },
      Printing: {
        anothersubsector: [
          "Advertising",
          "Book/Periodicals printing",
          "labelling and packaging printing",
        ],
      },
      "Textile and Clothing": {
        anothersubsector: ["Clothing", "Textile"],
      },
      Wood: {
        anothersubsector: [
          "Other (Wood)",
          "Wooden bulding materials",
          "Wooden houses",
        ],
      },
    },
    Other: {
      "Creative industries": {
        anothersubsector: [],
      },
      "Energy technology": {
        anothersubsector: [],
      },
      Environment: {
        anothersubsector: [],
      },
    },
    Service: {
      "Business services": {
        anothersubsector: [],
      },
      Engineering: {
        anothersubsector: [],
      },
      "Information Technology and Telecommunications": {
        anothersubsector: [
          "Data processing, Web portals, E-marketing",
          "Programming, Consultancy",
          "Software, Hardware",
          "Telecommunications",
        ],
      },
      Tourism: {
        anothersubsector: [],
      },
      "Translation services": {
        anothersubsector: [],
      },
      "Transport and Logistics": {
        anothersubsector: ["Air", "Rail", "Road", "Water"],
      },
    },
    // Add more sectors and their subsectors
  };

  function NestedSelects() {
    const handleSectorChange = (event) => {
      const sector = event.target.value;
      setSelectedSector(sector);
      setSelectedSubsector("");
      setselectedMicroSubsector("");
    };

    const handleSubsectorChange = (event) => {
      const subsector = event.target.value;
      setSelectedSubsector(subsector);
      setselectedMicroSubsector("");
    };

    const handleAnotherSubsectorChange = (event) => {
      setselectedMicroSubsector(event.target.value);
    };

    return (
      <div className="px-4 space-y-2">
        <select
          className="flex gap-3 w-full h-10 px-2 rounded-md font-semibold"
          defaultValue={data?.sector}
          value={selectedSector}
          onChange={handleSectorChange}
        >
          <option value="">Select a sector</option>
          {Object.keys(nestedData).map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>

        {selectedSector && (
          <select
            className="flex gap-3 w-full h-10 px-2 rounded-md font-semibold"
            value={selectedSubsector}
            onChange={handleSubsectorChange}
            defaultValue={data?.subsector}
          >
            <option value="">Select a subsector</option>
            {Object.keys(nestedData[selectedSector]).map((subsector) => (
              <option key={subsector} value={subsector}>
                {subsector}
              </option>
            ))}
          </select>
        )}

        {selectedSubsector && (
          <select
            className="flex gap-3 w-full h-10 px-2 rounded-md font-semibold "
            value={selectedMicroSubsector}
            onChange={handleAnotherSubsectorChange}
          >
            <option value="">Select a microsubsector</option>
            {nestedData[selectedSector][selectedSubsector].anothersubsector.map(
              (value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              )
            )}
          </select>
        )}
      </div>
    );
  }

  const handlesave = () => {
    if (!name || !selectedSector || !agree) {
      toast.warn("All fields are requird");
    } else {
      dispatch(
        updateSector({
          name: name,
          sector: selectedSector,
          subsector: selectedSubsector,
          microsector: selectedMicroSubsector,
          _id: data._id,
        })
      );

      setshow(!show);
    }
  };

  return (
    <>
      {show && (
        <div className="fixed top-0 left-0 w-full h-full bg-slate-400 bg-opacity-70 flex items-center justify-center  ">
          <div className="w-5/12 bg-white  pb-5 rounded-md overflow-hidden">
            <div className="flex justify-between items-center p-5  bg-gray-200  mb-2 text-xl font-semibold ">
              {title}
              <MdClose
                className="h-7 w-7 rounded-md bg-white cursor-pointer"
                onClick={() => setshow(!show)}
              />
            </div>{" "}
            <div className="px-4 space-y-2 mb-2">
              <p className="font-semibold ">Name :</p>
              <input
                type="text"
                className="w-full p-2 bg-gray-200 font-semibold rounded-md"
                name="name"
                id=""
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className="px-4 space-y-2 mb-2">
              <p className="font-semibold ">Sectors :</p>
            </div>
            <NestedSelects />
            <label
              htmlFor="ag"
              className="flex  items-center px-5 my-2 gap-2 font-semibold cursor-pointer w-fit "
            >
              <input
                checked={agree}
                onChange={() => setagree(!agree)}
                className=""
                type="checkbox"
                name="agree"
                id="ag"
              />{" "}
              <p>Agree to terms ?</p>
            </label>
            <button
              onClick={handlesave}
              className="bg-blue-400 text-white font-semibold w-fit py-1 ms-4 mt-2 rounded-md px-4"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FieldComUpdate;
