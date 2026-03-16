import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "../../Services/AxiosInstance";


// ------------------- Beauty API -------------------
export const GetBeauty = createAsyncThunk(
  "Beauty/GetBeauty",
  async () => {
    const data = await axiosApi.get("/beauty");
    return data;
  }
);