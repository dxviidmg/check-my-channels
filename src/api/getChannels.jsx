import { getToken } from './getToken';
import axios from "axios";

const entertainmentStreamingUrl =
  process.env.REACT_APP_ENTERTAINMENT_STREAMING_URL;
const apiUrl = `${entertainmentStreamingUrl}api/channel-list/?is_popular=true`;

const getChannels = async () => {

    
    try {
        const token = await getToken()
        console.log(token)

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        return response.data
      } catch (error) {
        console.log(error)
        return error
      }    


}

export default getChannels
