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
import { useCallback, useEffect, useMemo, useState } from "react";
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
  background-color: #E1EDF2;
`;

const LineContainer = styled.div``;

const LOGS_URL = "https://sagar-cse-407-mid.vercel.app/tuya/logs";
// const LOGS_URL = "https://smart-outlet.onrender.com/tuya/logs";

const MeterPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [amps, setAmps] = useState<TLog[]>([]);
  const [voltage, setVoltage] = useState<TLog[]>([]);
  const [power, setPower] = useState<TLog[]>([]);

  const getCurrentData = useCallback(async (isLoad = false) => {
    if (isLoad) {
      setLoading(isLoad);
    }
    try {
      const [{ data: ampData }, { data: voltData }, { data: powerData }] =
        await Promise.all([
          axios.get<TGetLogsResponse>(LOGS_URL, {
            params: { codes: "cur_current", size: 50 },
          }),
          axios.get<TGetLogsResponse>(LOGS_URL, {
            params: { codes: "cur_voltage", size: 50 },
          }),
          axios.get<TGetLogsResponse>(LOGS_URL, {
            params: { codes: "cur_power", size: 50 },
          }),
        ]);
      setAmps(ampData.result.logs);
      setVoltage(voltData.result.logs);
      setPower(powerData.result.logs);
    } catch (err) {
      //
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCurrentData(true);

    const tId = setInterval(() => getCurrentData(), 30 * 1000);

    return () => {
      clearInterval(tId);
    };
  }, [getCurrentData]);

  const meterData = useMemo(() => {
    const data: { a: TLog; v: TLog; p: TLog; w: number; t: number }[] = [];
    let lastV = voltage[voltage.length - 1];
    amps.forEach((a) => {
      let v = voltage.find((d) => d.event_time === a.event_time);
      if (!v) v = { ...lastV, event_time: a.event_time };
      else lastV = v;
      const w = (parseInt(v.value) / 10) * (parseInt(a.value) / 1000);
      const p = power.find((d) => d.event_time === a.event_time);
      if (p) data.unshift({ a, v, p, w, t: v.event_time });
    });
    return data;
  }, [amps, power, voltage]);

  return (
    <Container>
      {loading ? <p>Loading</p> : null}
      <LineContainer>
        <Line
          redraw
          updateMode="resize"
          options={{
            backgroundColor: "#E1EDF2",
            scales: {},
          }}
          data={{
            labels: meterData.map((d) => dayjs(d.t).format("DD HH:mm:ss")),
            datasets: [
              {
                data: meterData.map(({ a }) => parseInt(a.value)),
                label: "Current (mA)",
                backgroundColor: "#FF9671",
                fill: true,
              },
              {
                data: meterData.map(({ v }) => parseInt(v.value) / 10),
                label: "Voltage (V)",
                backgroundColor: "#D65DB1",
                fill: true,
              },
              {
                data: meterData.map(({ w }) => w),
                label: "Wattage (Watts)",
                backgroundColor: "#4B4453",
                fill: true,
              },
              {
                data: meterData.map(({ p }) => parseInt(p.value)),
                label: "Power (Wh)",
                backgroundColor: "#00C9A7",
                fill: true,
              },
            ],
          }}
        />
      </LineContainer>
    </Container>
  );
};

export default MeterPage;
