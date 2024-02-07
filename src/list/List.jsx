import React, { useEffect, useState } from 'react'
import { getToken } from '../api/getToken';
import getChannels from '../api/getChannels';

const List = () => {
  const [channels, setChannels] = useState([])


  const entertainmentStreamingUrl = process.env.REACT_APP_ENTERTAINMENT_STREAMING_URL;
  const entertainmentStreamingUsername = process.env.REACT_APP_ENTERTAINMENT_STREAMING_USERNAME;
  const entertainmentStreamingPassword = process.env.REACT_APP_ENTERTAINMENT_STREAMING_PASSWORD;

  const apiUrl = `${entertainmentStreamingUrl}api/channel-list/?is_popular=true/`;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const channelsData = await getChannels();
        console.log('channelsData', channelsData)
//        setChannels(channelsData);
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    };

    fetchData();
  }, []);
  





  return (
    <div>
      hola
  {channels}      
    </div>
  )
}


export default List
