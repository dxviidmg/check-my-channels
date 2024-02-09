import React, { useEffect, useState } from "react";
import getChannels from "../api/getChannels";
import HLSPlayer from "../components/hlsPlayer/HLSPlayer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const List = () => {
  const [channels, setChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const channelsData = await getChannels();
        if (channelsData.length > 0) {
          channelsData.sort((a, b) => a.name.localeCompare(b.name));
        }

        setChannels(channelsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching channels:", error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Check my channels</h1>
      <Row>
        {channels &&
          channels.map((channel, index) => (
            <Col key={index} md={3}>
              <HLSPlayer link={channel.link} />
              {channel.name}
              <br />
              {channel.link}
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default List;
