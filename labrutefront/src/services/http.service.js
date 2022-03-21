import Axios from "axios";

const Http = Axios.create({
  baseURL: "/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default Http;
