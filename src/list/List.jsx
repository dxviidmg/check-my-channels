import React, { useEffect, useState } from 'react'
import { getToken } from '../api/getToken';
import getChannels from '../api/getChannels';
import HLSPlayer from '../components/hlsPlayer/HLSPlayer';

const List = () => {
  const [channels, setChannels] = useState([])
  const [channel, setChannel] = useState({"name": "", "link": ""})
  const [index, setIndex] = useState(0)

  const entertainmentStreamingUrl = process.env.REACT_APP_ENTERTAINMENT_STREAMING_URL;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const channelsData = await getChannels();
        console.log('channelsData', channelsData)
        setChannels(channelsData);
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    };

    fetchData();
  }, []);
  


  useEffect(() => {
    setTimeout(() => {
      setIndex(index + 1);
      setChannel(channels[index])
      if (index == channels.length - 1){
        console.log('index dentro de cond', index)
        setIndex(0)
      }
    }, 3000);
  });




  return (
    <div>
      {JSON.stringify(channel)}
      {channel?.link !== undefined ? "si": "no"}
    </div>
  )
}


export default List
