import { Switch } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import "leaflet/dist/leaflet.css";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

dayjs.extend(duration);
dayjs.extend(relativeTime);

const MainContainer = styled.div`
  background-color: white;
  min-height: 100vh;
  padding: 16px 24px;
  text-align: center;
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

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const DevicePage: React.FC = () => {
  const [deviceInfo, setDeviceInfo] = useState<TDeviceInfoResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [toggleLoading, setToggleLoading] = useState<boolean>(false);

  const getDeviceInfoApiAction = useCallback(async (isLoad = false) => {
    try {
      if (isLoad) {
        setLoading(true);
      }
      const { data } = await axios.get<TGetDeviceInfoResponse>(
         "https://sagar-cse-407-mid.vercel.app/tuya/device"
       // "https://smart-outlet.onrender.com/tuya/device"
      );
      setDeviceInfo(data.result);
    } catch (err) {
      //
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getDeviceInfoApiAction(true);
  }, [getDeviceInfoApiAction]);

  const toggleSwitch = useCallback(async () => {
    if (!deviceInfo) return;
    try {
      setToggleLoading(true);
      const switch_stat = Boolean(
        deviceInfo.status.find((s) => s.code === "switch_1")?.value
      );
      const toggleMode = switch_stat ? "off" : "on";
      await axios.get<TGetDeviceInfoResponse>(
         "https://sagar-cse-407-mid.vercel.app/tuya/turn-switch/" + toggleMode
       // "https://smart-outlet.onrender.com/tuya/turn-switch/" + toggleMode
      );
      setDeviceInfo((prev) => {
        if (!prev) return prev;
        const newObj = { ...prev };
        newObj.status = prev.status.map((st) => {
          if (st.code === "switch_1") return { ...st, value: !st.value };
          return st;
        });
        return newObj;
      });
    } catch (err) {
      //
    } finally {
      setToggleLoading(false);
    }
  }, [deviceInfo]);

  return (
    <MainContainer>
      {loading ? (
        "Loading"
      ) : deviceInfo ? (
        <>
          <Title>CSE407 Mid Term Project Dashboard</Title>
          <Label>
            Device name:&nbsp;&nbsp;<DataValue>{deviceInfo.name}</DataValue>
          </Label>
          <Label>
            Model:&nbsp;&nbsp;
            <DataValue>{deviceInfo.model}</DataValue>
          </Label>
          <Label>
            Online:&nbsp;&nbsp;
            <DataValue>{deviceInfo.online ? "YES" : "NO"}</DataValue>
          </Label>
          <Label>
            Activated time:&nbsp;&nbsp;
            <DataValue>
              {dayjs
                .duration(deviceInfo.active_time)
                .format("DD[d] HH[h] mm[m] ss[s]")}
            </DataValue>
          </Label>
          <Label>
            IP address:&nbsp;&nbsp;
            <DataValue>{deviceInfo.ip}</DataValue>
          </Label>

          <FlexContainer>
            <Label>Toggle switch:</Label>
            <Switch
              checked={Boolean(
                deviceInfo.status.find((s) => s.code === "switch_1")?.value
              )}
              onChange={toggleSwitch}
              loading={toggleLoading}
            />
          </FlexContainer>

          {/* <Label>Location:</Label>
          <div style={{ height: "400px", width: "600px" }}>
            <MapContainer
              center={[Number(deviceInfo.lat), Number(deviceInfo.lon)]}
              zoom={16}
              style={{ height: "400px", width: "600px" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={[Number(deviceInfo.lat), Number(deviceInfo.lon)]}
              >
                <Popup>
                  Latitude: {deviceInfo.lat}
                  <br />
                  Longitude: {deviceInfo.lon}
                </Popup>
              </Marker>
            </MapContainer>
          </div> */}
        </>
      ) : (
        "No data found"
      )}
    </MainContainer>
  );
};

export default DevicePage;
