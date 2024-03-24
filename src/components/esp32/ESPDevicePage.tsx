import { Image } from "antd";
import styled from "styled-components";

const MainContainer = styled.main`
  background-color: white;
  min-height: 100vh;
  padding: 16px 24px;
`;

const Title = styled.h1`
  color: #171717;
`;

const Label = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #323232;
  margin: 0;
`;

const DataValue = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #000;
`;

const PhotoContainer = styled.div`
  margin-top: 2rem;
  max-width: 900px;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`;

const Photo = styled(Image)`
  max-height: 280px;
  flex: 1;
  object-fit: cover;
`;

const ESPDevicePage: React.FC = () => {
  return (
    <MainContainer>
      <Title>Device information</Title>
      <Label>
        Name:&nbsp;&nbsp;
        <DataValue>Smart outlet solution</DataValue>
      </Label>
      <Label>Description:</Label>
      <DataValue>
        A smart outlet solution that uses CT sensor, and voltage sensor to
        measure current, voltage, wattage, and power and uses ESP32 to store
        these data on the cloud using built-in WiFi module.
      </DataValue>

      <PhotoContainer>
        <Photo height={280} src="/cust_plug_1.jpg" alt="Plug image 1" />
        <Photo height={280} src="/cust_plug_2.jpg" alt="Plug image 2" />
        <Photo height={280} src="/cust_plug_3.jpg" alt="Plug image 3" />
      </PhotoContainer>
    </MainContainer>
  );
};

export default ESPDevicePage;
