import { Button, Form, Input } from "antd";
import axios from "axios";
import { useCallback, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem 3rem;
  background-color: white;
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

const ESPCalculatorPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<{ total: number } | undefined>(undefined);
  const [price, setPrice] = useState<number | undefined>(undefined);
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
        "http://localhost:5000/esp/power-consumption"
        //"https://smart-outlet.onrender.com/esp/power-consumption"
      );
      setData(data);
    } catch (err) {
      //
    } finally {
      setLoading(false);
    }
  }, [price]);

  return (
    <Container>
      <Title>Calculate power consumption</Title>
      <Form style={{ width: 600 }}>
        <Form.Item
          label={<Label>Select per unit price</Label>}
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
            Total power consumed with this outlet:&nbsp;
            <strong>
              {data.total.toFixed(3)}
              &nbsp;kWh
            </strong>
          </Text>
          <Text>
            Total cost:&nbsp;
            <strong>
              {(data.total * price).toFixed(2)}
              &nbsp;
            </strong>
          </Text>
        </>
      ) : null}
    </Container>
  );
};

export default ESPCalculatorPage;
