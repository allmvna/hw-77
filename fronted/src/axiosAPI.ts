import axios from "axios";
import {apiURL} from "./globalConstant.ts";

const axiosAPI = axios.create({
  baseURL: apiURL,
});

export default axiosAPI;
