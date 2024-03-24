import { Link } from "react-router-dom";
import styled from "styled-components";
import "./App.css";

const HomeContainer = styled.main`
  height: 100vh;
  background-image: url("/green_city.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  font-family: "Orbitron", sans-serif;
`;

const Overlay = styled.div`
  background-image: radial-gradient(
    rgba(0, 0, 0, 0) 5%,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.75)
  );
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 52px;
`;

const Title = styled.h1`
  color: #76a9c6;
  font-size: 52px;
  font-weight: 900;
  margin: 0;
  text-shadow: 2px 2px 20px #33472e;
  text-align: center;
`;
const Subtitle = styled.h2`
  color: #e9f3eb;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  text-shadow: 2px 2px 20px #33472e;
  text-align: center;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

const CardButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  width: 300px;
  height: 200px;
  border-radius: 4px;
  border: 2px solid #3c8396;
  background-color: rgba(233, 243, 235, 0.6);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-width: 2px;
    border-color: #556b37;
    transform: scale(1.05);
    background-color: rgba(233, 243, 235, 0.9);
  }
`;

const Text = styled.p`
  font-size: 24px;
  font-weight: 700;
  color: #33472e;
`;

function App() {
  return (
    <HomeContainer>
      <Overlay>
        <div>
          <Title>S.E.M</Title>
          <Subtitle>IoT based real-time energy monitoring</Subtitle>
        </div>
        <CardsContainer>
          <CardButton to="/esp32">
            <Text>ESP32</Text>
          </CardButton>
          <CardButton to="/tuya">
            <Text>Tuya</Text>
          </CardButton>
        </CardsContainer>
      </Overlay>
    </HomeContainer>
  );
}

export default App;
