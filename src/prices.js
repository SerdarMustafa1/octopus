import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { DateTime } from "luxon";

const Header = styled.div`
  height: 100px;
  width: 100%;
  background: #170349;
  color: white;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  background: #36393e;
  display: flex;
  justify-content: center; // 1
  flex-flow: column wrap; // 2
  width: 100%;
  height: 100%;
`;
const List = styled.div`
  display: flex;
  justify-content: center; // 3
  flex-flow: row wrap; // 4
`;

const Card = styled.div`
  margin: 20px;
  background: #fff;
  height: 400px;
  width: 400px;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-flow: column; // 5
  justify-content: center;
  align-items: center;
`;

const Prices = () => {
  const [prices, setPrices] = useState([]);

  const url =
    "https://api.octopus.energy/v1/products/AGILE-18-02-21/electricity-tariffs/E-1R-AGILE-18-02-21-B/standard-unit-rates/";

  useEffect(() => {
    getPrices();
  }, []);
  console.log("prices", prices);

  const getPrices = () => {
    axios
      .get(url)
      .then((response) => {
        const octoPrices = response?.data?.results;
        setPrices(octoPrices);
      })
      .catch((error) => console.error("There was an error!", error));
  };

  if (prices.length > 0) {
    return (
      <Container>
        <Header>
          <h1>Octopus Prices</h1>
        </Header>
        <List>
          {prices
            ?.slice(0)
            .reverse()
            .map((price, idx) => {
              const cost = price?.value_inc_vat;

              return (
                <Card key={idx}>
                  <p>{DateTime.fromISO(price?.valid_from).toFormat("fff")}</p>
                  <p>{cost.toFixed(2)}p</p>
                </Card>
              );
            })}
        </List>
      </Container>
    );
  } else {
    return <div>None found</div>;
  }
};

export default Prices;
