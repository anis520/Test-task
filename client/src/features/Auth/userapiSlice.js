import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addSector = createAsyncThunk("user/addSector", async (data) => {
  try {
    const response = await axios.post(
      `https://testapi-l049.onrender.com/api/v1/user/`,
      data
    );
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const getSector = createAsyncThunk("user/getSector", async () => {
  try {
    const response = await axios.get(
      `https://testapi-l049.onrender.com/api/v1/user/`,

      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const deleteSector = createAsyncThunk(
  "user/deleteSector",
  async (id) => {
    try {
      const response = await axios.delete(
        `https://testapi-l049.onrender.com/api/v1/user/${id}`,

        { withCredentials: true }
      );
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const updateSector = createAsyncThunk(
  "user/updateSector",
  async (data) => {
    try {
      const response = await axios.put(
        `https://testapi-l049.onrender.com/api/v1/user`,
        data,

        { withCredentials: true }
      );
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
