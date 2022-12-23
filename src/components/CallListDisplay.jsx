import {Button, Box, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DisplayTable from "./DisplayTable";

const SearchParams = () => {

    //endpoints found using Postman

    const Endpoints = ["repos", "events",  "members", "hooks", "issues"];

    
    // state values and functions
    const [endpoint, updateEndpoint] = useState("");
    const [error, setError] = useState("");
    const [repoData, setRepoData] = useState({});
    const [displays, setDisplays] = useState([]);


  
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

    async function requestDisplays(e) {
        e.preventDefault();
        setError("");
    
        // call our various api endpoints
      
        const res = await fetch(
          `https://api.github.com/orgs/boomtownroi/${endpoint}`
        ).then(async (response) => {
          if (response.ok) {
            const data = await response.json();
    
            //set data response according to endpoint response object
            setDisplays(data);
    
            //perform repos verification comparing actual number to listed number
            if (endpoint === "repos" && data.length !== repoData.public_repos) {
                setError("Repo count does not match public repo count")
            }
            else if (endpoint === "repos" && data.length === repoData.public_repos) {
              console.log("Repos good!")
            }
            
          } else {
            // return error message if response is not in successful range of 200-299
            setError("Network request returns a " + response.status + " status response");
            setDisplays([]); 
            console.log(response.status);
          }
        });
      }
    
  
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
          <Button variant="contained" onClick={requestDisplays} sx={{width:"100px", margin:"20px"}}>Submit</Button>

         
        {error !== "" && <Typography variant="h6">{error}</Typography>}

        

        {displays.map((display) => (

            //passing response object properties to display in table view
        <DisplayTable
          name={display.name}
          id={display.id}
          type={display.type}
          login={display.login}
          message={display.message}
          key={display.id}
        />
      ))}
       </Stack>
        </Box>
        </>
    );
  };
  
  export default SearchParams;