// eslint-disable-next-line no-unused-vars
import { axios, abortController } from "../axios/axios";

const getUser = async (token) => {
  try {
    const user = await axios.get("/GetUser", {
      // signal: abortController.signal,
      headers: {
        Authorization: `Bearer ${token}}`,
      },
    });
    console.log(user);
  } catch (err) {
    console.log(err);
  }
};

export { getUser };
