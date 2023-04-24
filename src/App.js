import Api from "./Api";
import { useEffect, useState } from "react";

import {
  MenuItem,
  Paper,
  Stack,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  TableCell,
  TableBody,
} from "@mui/material";
import LoadingSpinner from "./LoadingSpinner";

const ARR = [
  "Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”",
  "Male Users which have phone price greater than 10,000",
  "Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name",
  "Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit",
  "Data of top 10 cities which have the highest number of users and their average income",
];

function App() {
  const [optionId, SetOptionId] = useState(1);

  const [tableData, SetTableData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [options] = useState(
    ARR.map((ele, index) => ({ value: index + 1, label: ele }))
  );

  const handleOptionChange = (event, newOption) => {
    SetOptionId(newOption.props.value);
  };

  async function fetchData(optionId) {
    const uri = `users${optionId}`;

    const response = await Api.get(uri);

    SetTableData(response.data);
    setIsLoading(false);
  }
  useEffect(() => {
    setIsLoading(true);
    fetchData(optionId);
  }, [optionId]);

  const TABLEHEAD =
    optionId === 5
      ? ["City", "Number of Users", "Average Income"]
      : [
          "First Name",
          "Last Name",
          "Email",
          "Gender",
          "Income",
          "City",
          "Car",
          "Quote",
          "Phone Price",
        ];

  const TABLEDATA =
    optionId === 5
      ? ["_id", "count", "averageIncome"]
      : [
          "first_name",
          "last_name",
          "email",
          "gender",
          "income",
          "city",
          "car",
          "quote",
          "phone_price",
        ];

  return (
    <>
      <Stack direction="column" spacing={1} sx={{ mb: 4 }}>
        <Typography>Select an option</Typography>
        <TextField
          select
          size="small"
          value={optionId}
          onChange={(event, newOption) => handleOptionChange(event, newOption)}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {TABLEHEAD.map((head) => (
                  <TableCell
                    sx={{
                      minWidth: 100,
                      zIndex: 900,
                      position: "sticky",
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((data) => (
                <TableRow
                  sx={{
                    height: 80,
                    borderBottom: 1,
                    borderColor: "grey.300",
                  }}
                >
                  {TABLEDATA.map((id) => (
                    <TableCell>{data[id]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default App;
