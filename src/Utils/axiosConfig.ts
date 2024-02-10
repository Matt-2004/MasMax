import axios from "axios";

module.exports(
  axios.create({
    baseURL: "http://localhost:8000",
  })
);
