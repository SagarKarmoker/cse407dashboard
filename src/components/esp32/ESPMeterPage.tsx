import axios from "axios";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Container = styled.div`
  min-height: 100vh;
  background-color: white;
`;

const LineContainer = styled.div``;

const LOGS_URL = "http://localhost:5000/esp/logs";
//const LOGS_URL = "https://smart-outlet.onrender.com/esp/logs";

const ESPMeterPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [logs, setLogs] = useState<TEspLog[]>([]);

  const getCurrentData = useCallback(async (isLoad = false) => {
    if (isLoad) {
      setLoading(isLoad);
    }
    try {
      const { data } = await axios.get<TEspLog[]>(LOGS_URL);
      setLogs(data);
    } catch (err) {
      //
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCurrentData(true);

    const tId = setInterval(() => getCurrentData(), 20 * 1000);

    return () => {
      clearInterval(tId);
    };
  }, [getCurrentData]);

  return (
    <Container>
      {loading ? <p>Loading</p> : null}
      <LineContainer>
        <Line
          redraw
          updateMode="resize"
          options={{
            backgroundColor: "white",
            scales: {},
          }}
          data={{
            labels: logs.map((d) => dayjs(d.time).format("DD HH:mm:ss")),
            datasets: [
              {
                data: logs.map(({ current }) => current),
                label: "Current (mA)",
                backgroundColor: "#FF3131",
                fill: true,
              },
              {
                data: logs.map(({ voltage }) => voltage),
                label: "Voltage (V)",
                backgroundColor: "#50C878",
                fill: true,
              },
              {
                data: logs.map(
                  ({ current, voltage }) => (current / 1000) * voltage
                ),
                label: "Wattage (Watts)",
                backgroundColor: "#FFD700",
                fill: true,
              },
              {
                data: logs.map(({ power }) => power),
                label: "Power (Wh)",
                backgroundColor: "#0096FF",
                fill: true,
              },
            ],
          }}
        />
      </LineContainer>
    </Container>
  );
};

export default ESPMeterPage;
