import { GOOGLE_API_URL } from "@env";
import axios from "axios";

export const authAPI = axios.create({
  baseURL: GOOGLE_API_URL
});
