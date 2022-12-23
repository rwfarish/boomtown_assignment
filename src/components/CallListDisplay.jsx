import { Box, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const SearchParams = () => {

    //endpoints found using Postman

    const Endpoints = ["repos", "events",  "members", "hooks", "issues"];

    
    // state values and functions
    const [endpoint, updateEndpoint] = useState("");
    const [error, setError] = useState("");
    const [repoData, setRepoData] = useState({});

  
   useEffect(() => {
      async function loadRepo() {
        // fetch top level organization object
        const res = await fetch(`https://api.github.com/orgs/boomtownroi`);

        // return JavaScript object

        const data = await res.json();
  
    // run date verification on top level organization object

        if (Date.parse(data.created_at) >= Date.parse(data.updated_at)) {
          setError("Repo updated_at invalid");
        }
        else {
          console.log("Date validation is correct!")
        }
  
        setRepoData(data);
  
      }
  
      loadRepo();
  
    }, []);
  
    
  
    return (
      <>
        <Box sx={{display: "flex"}}>
          <Stack>
        <FormControl sx={{width: "500px", margin:"15px"}}>
          <InputLabel>Endpoint</InputLabel>  
            <Select
              id="endpoint"
              value={endpoint}
              onChange={(e) => updateEndpoint(e.target.value)}
              label="Endpoint"
            >
              {Endpoints.map((endpoint) => (
                <MenuItem key={endpoint} value={endpoint}>
                  {endpoint}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
         
        {error !== "" && <Typography variant="h6">{error}</Typography>}
       
            </Stack>
        </Box>
        </>
    );
  };
  
  export default SearchParams;