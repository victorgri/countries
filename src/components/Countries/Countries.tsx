import { Container, Table } from "react-bootstrap";
import { Country } from "../../types/Country";
import React from "react";


type Props = {
  countries: Country[],
};

export const Countries: React.FC<Props> = ({ countries }) => {

  return (
    <Container>
      <Table hover>
        <thead>
          <tr>
            <th>
              Country name
            </th>
            <th>Area</th>
            <th>Region</th>
          </tr>
        </thead>

        <tbody>
          {countries.map((country) => (
            <tr key={country.name}>
              <td>{country.name}</td>
              <td>{country.area}</td>
              <td>{country.region}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}