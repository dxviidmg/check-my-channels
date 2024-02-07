import axios from "axios";

const entertainmentStreamingUrl =
  process.env.REACT_APP_ENTERTAINMENT_STREAMING_URL;
const apiUrl = `${entertainmentStreamingUrl}api/api-token-auth/`;

const entertainmentStreamingUsername =
  process.env.REACT_APP_ENTERTAINMENT_STREAMING_USERNAME;
const entertainmentStreamingPassword =
  process.env.REACT_APP_ENTERTAINMENT_STREAMING_PASSWORD;

export const getToken = async () => {
  try {
    const response = await axios.post(
      apiUrl,
      {
        username: entertainmentStreamingUsername,
        password: entertainmentStreamingPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.token;
  } catch (error) {
    return error;
  }
};
