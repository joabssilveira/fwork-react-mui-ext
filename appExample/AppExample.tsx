import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { AutocompleteClientComponentExample } from "./examples/autoCompleteClient";
import { DateTimeRangeComponentExample } from "./examples/dateTimeRange";
import { TableBaseComponentExample } from "./examples/tableBase";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const AppExample = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return <div style={{ padding: 20, fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"' }}>
    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
      <Tab label="Item One" {...a11yProps(0)} />
      <Tab label="Item Two" {...a11yProps(1)} />
      <Tab label="Item Three" {...a11yProps(2)} />
    </Tabs>
    <CustomTabPanel value={value} index={0}>
      <AutocompleteClientComponentExample />
      <DateTimeRangeComponentExample />
      <TableBaseComponentExample />
    </CustomTabPanel>
    <CustomTabPanel value={value} index={1}>
      Item Two
    </CustomTabPanel>
    <CustomTabPanel value={value} index={2}>
      Item Three
    </CustomTabPanel>

  </div>
}
