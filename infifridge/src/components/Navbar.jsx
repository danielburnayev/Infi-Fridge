import {fetchPostItNoteByTitle} from '../database/Client';
import {useState} from 'react';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import "./Navbar.css";
import "../pages/Pages.css";

function Navbar(props) {
    const [sortValue, changeSortValue] = useState("Most Recent");
    const [orgValue, changeOrgValue] = useState("Bottom");

    const doSearch = async (event) => {
        event.preventDefault();

        const theTitle = event.target[0].value;
        const {data, error} = await fetchPostItNoteByTitle(theTitle);
        if (data != null) {
            const wantedPostIt = document.getElementById(theTitle);
            wantedPostIt.scrollIntoView({behavior: "smooth"});
        }
        else {
            const searchBar = document.getElementById('search-bar');
            searchBar.classList.add('shake-animation');
            const timeout = setTimeout(() => {
                searchBar.classList.remove('shake-animation');
                clearTimeout(timeout);
            }, 330);
        }
    };

    const makeSortValueChanges = async (event) => {
        const theVal = event.target.value;
        var type;

        if (theVal == 'Most Recent') {type = 0;}
        else if (theVal == 'Least Recent') {type = 1;}
        else if (theVal == 'Best Received') {type = 2;}
        else {type = 3;} //worst received

        props.changeSortType(type);
        changeSortValue(theVal);
    };

    const makeOrgValueChanges = (event) => {
        const theVal = event.target.value;
        const postItContainer = document.getElementById('post-it-container');
        postItContainer.style.flexDirection = (theVal == 'Top') ? 'column' : 'column-reverse';
        
        changeOrgValue(theVal);
    };

    return(
        <div id="navbar-container">
            <div id="info-container" style={{display: "flex", alignItems: "center"}}>
                <h1>Infi-Fridge</h1>
                <p style={{width: '18.5vw', textAlign: 'center'}}>
                    Place Post-It Notes on an infinitly-expanding refrigerator
                </p>
            </div>

            <Box id="search-bar" component="form" onSubmit={(event) => doSearch(event)} 
                 sx={{display: "flex", alignItems: "center"}}>
                <TextField variant="outlined" placeholder="Search for Post-It title" 
                           sx={{backgroundColor: "white", borderRadius: "0", marginRight: "5px"}}/>
                <Button type="submit" 
                        sx={{color: 'black',
                             backgroundColor: 'rgba(188, 240, 254, 255)',
                             borderRadius: '0',
                             width: '5vw', height: '5vw'}}>
                                <div className="post-it-note-button-top" 
                                     style={{backgroundColor: "rgba(177, 226, 240, 255)"}}/>
                                Search
                </Button>
            </Box>

            <div id="settings-container" style={{display: "flex", alignItems: "center"}}>
                <Button onClick={() => props.showOtherPages(1)} disabled 
                        sx={{color: 'black',
                             backgroundColor: 'rgba(156, 245, 115, 255)',
                             borderRadius: '0',
                             width: '5vw', height: '5vw',
                             overflow: "clip"}}>
                                <div className="post-it-note-button-top" 
                                     style={{backgroundColor: "rgba(147, 231, 109, 255)"}}/>
                                Add Post-It
                </Button>
                
                <FormControl>
                    <InputLabel id="sort-input-label">Sort By:</InputLabel>
                    <Select sx={{height: "35px", width: "11vw", borderRadius: "0", overflowX: "clip"}}
                            labelId="sort-input-label"
                            id="sort-select"
                            value={sortValue} 
                            label="Sort By:" 
                            onChange={(event) => makeSortValueChanges(event)}>
                        <MenuItem value={"Most Recent"}>Most Recent</MenuItem>
                        <MenuItem value={"Least Recent"}>Least Recent</MenuItem>
                        <MenuItem value={"Best Received"}>Best Received</MenuItem>
                        <MenuItem value={"Worst Received"}>Worst Received</MenuItem>
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel id="org-input-label">Organize From:</InputLabel>
                    <Select sx={{height: "35px", width: "8vw", borderRadius: "0", overflowX: "clip"}}
                            labelId="org-input-label"
                            id="org-select"
                            value={orgValue} 
                            label="Organize From:" 
                            onChange={(event) => makeOrgValueChanges(event)}>
                        <MenuItem value={"Bottom"}>Bottom</MenuItem>
                        <MenuItem value={"Top"}>Top</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}

export default Navbar;