import React, { useEffect, useState } from 'react';
import getChannels from '../api/getChannels';
import HLSPlayer from '../components/hlsPlayer/HLSPlayer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const List = () => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const channelsData = await getChannels();

        channelsData.sort((a, b) => a.name.localeCompare(b.name));

        console.log('channelsData', channelsData);
        setChannels(channelsData);
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Row>
      {channels.map((channel) => {
        return (<Col md={3}><HLSPlayer link={channel.link}/>
        {channel.name}
        </Col>)
      })}
    </Row>
  );
};

export default List;
