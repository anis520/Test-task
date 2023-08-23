import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";
import FieldCom from "./FieldCom";
import { useDispatch, useSelector } from "react-redux";
import { deleteSector } from "../features/Auth/userapiSlice";
import FieldComUpdate from "./FieldComUpdate";
import { CreateTost } from "../utils/CreateToastifyAlert";
import { setMessageEmpty } from "../features/Auth/userSlice";
const Home = () => {
  const dispatch = useDispatch();

  const [addNew, setAddNew] = useState(false);
  const [update, setUpate] = useState(false);
  const [updateId, setUpateId] = useState("");

  const { loading, sectors, message, error } = useSelector(
    (state) => state.user
  );

  const handleDelete = (id) => {
    dispatch(deleteSector(id));
  };
  const handleUpdate = (id) => {
    let findUpdateData = sectors.find((e) => e._id == id);

    setUpate(!update);
    setUpateId(findUpdateData);
  };

  useEffect(() => {
    if (error) {
      CreateTost(error, "error");
      dispatch(setMessageEmpty());
    }
    if (message) {
      CreateTost(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [error, message]);

  return (
    <div className="w-full bg-slate-100  p-2 md:p-10  h-screen">
      <FieldCom show={addNew} setshow={setAddNew} title={"Add new"} />
      <FieldComUpdate
        show={update}
        setshow={setUpate}
        title={"Edit data"}
        data={updateId}
      />
      <p className="font-semibold text-2xl flex justify-between">
        Home page{" "}
        <button
          onClick={() => {
            setAddNew(!addNew);
          }}
          className="bg-blue-400 text-white font-semibold  px-2 py-1 rounded-md text-xl cursor-pointer"
        >
          Add
        </button>
      </p>

      <div className="space-y-2">
        <p className="bg-gray-300   flex p-2 rounded-md justify-between my-3 px-10  font-semibold ">
          <p>Name</p>
          <p>Sector - [ Datails ]</p>

          <p>Action</p>
        </p>{" "}
        {sectors?.map((item, key) => {
          return (
            <p
              key={key}
              className="bg-gray-300 flex p-2 rounded-md justify-between my-3 px-10  font-semibold flex-col md:flex-row space-y-3 md:space-y-0"
            >
              <p>{item.name}</p>
              <p className="flex">
                {item.sector} - {item.subsector} - {item.microsector}
              </p>

              <p className="flex items-center gap-2">
                <MdEdit
                  onClick={() => {
                    handleUpdate(item._id);
                  }}
                  className="bg-yellow-400 text-slate-800 h-7 w-7 p-1 rounded-md cursor-pointer"
                />
                <MdDelete
                  onClick={() => {
                    handleDelete(item._id);
                  }}
                  className="bg-red-400 text-white h-7 w-7 p-1 rounded-md cursor-pointer"
                />
              </p>
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
