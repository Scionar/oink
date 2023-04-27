require("dotenv").config();

import { AuthApiDataSource } from "./dataSource";

AuthApiDataSource.initialize()
  .then(() => {
    console.log("Initialization complete");
  })
  .catch((error) => console.log(error));
