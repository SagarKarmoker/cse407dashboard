import { Button, DatePicker, Form, Input } from "antd";
import axios from "axios";
import { Dayjs } from "dayjs";
import { useCallback, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem 3rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #171717;
`;

const Label = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: #212121;
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #212121;
`;

const CalculatorPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<
    { total: number; count: number } | undefined
  >(undefined);
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [range, setRange] = useState<[Dayjs, Dayjs] | undefined>(undefined);
  const [inputError, setInputError] = useState<string | undefined>(undefined);

  const getPowerConsumption = useCallback(async () => {
    if (!price) {
      setInputError("Select per unit price");
      return;
    }
    setInputError(undefined);
    setLoading(true);
    try {
      const { data } = await axios.get(
         "https://sagar-cse-407-mid.vercel.app/tuya/power-consumption",
       // "https://smart-outlet.onrender.com/tuya/power-consumption",
        {
          params: {
            dateStart: range?.[0] ? +range[0] : undefined,
            dateEnd: range?.[1] ? +range[1] : undefined,
          },
        }
      );
      setData(data);
    } catch (err) {
      //
    } finally {
      setLoading(false);
    }
  }, [price, range]);

  const totalPower = data ? data.total / data.count / 100 : NaN;

  return (
    <Container>
      <Title>COST CALCULATION (Day Range)</Title>
      <Form style={{ width: 600 }}>
        <Form.Item label={<Label>Select a date range</Label>}>
          <DatePicker.RangePicker
            style={{ width: "100%" }}
            size="large"
            allowEmpty={[true, true]}
            allowClear
            value={range}
            onChange={(values) => {
              setRange(values as [Dayjs, Dayjs]);
            }}
            showTime
          />
        </Form.Item>
        <Form.Item
          label={<Label>Unit Price (In TAKA)</Label>}
          help={inputError}
          validateStatus={inputError ? "error" : undefined}
        >
          <Input
            type="number"
            style={{ width: "100%" }}
            size="large"
            placeholder="per unit cost"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </Form.Item>
        <Button
          style={{ width: "100%" }}
          size="large"
          type="primary"
          loading={loading}
          onClick={getPowerConsumption}
        >
          Calculate
        </Button>
      </Form>

      {price && data ? (
        <>
          <Text>
            Total power consumed in this time range:&nbsp;
            <strong>
              {totalPower.toFixed(3)}
              &nbsp;kWh
            </strong>
          </Text>
          <Text>
            Total cost:&nbsp;
            <strong>
              {(totalPower * price).toFixed(2)}
              &nbsp;
            </strong>
          </Text>
        </>
      ) : null}
    </Container>
  );
};

export default CalculatorPage;
