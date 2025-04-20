import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import {Wheel} from '@uiw/react-color';
import {useState} from 'react';
import './Pages.css';

function CreateForm(props) {
    const [postItColor, changePostItColor] = useState('#FFFF00'); //yellow
    const [submitEvent, changeSubmitEvent] = useState(0);

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });
    
    const makePostItColorChanges = (color) => {
        const itsHex = color.hex;
        const theNote = document.getElementsByClassName("note-container")[0];
        const noteTop = theNote.children[0];

        const num = parseInt(itsHex.replace('#', ''), 16);
        let r = (num >> 16) - Math.round(25.5);
        let g = ((num >> 8) & 0x00FF) - Math.round(25.5);
        let b = (num & 0x0000FF) - Math.round(25.5);

        r = Math.max(0, r);
        g = Math.max(0, g);
        b = Math.max(0, b);

        const darkerItsHex = `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;

        changePostItColor(itsHex);
        theNote.style.backgroundColor = itsHex;
        noteTop.style.backgroundColor = darkerItsHex;
    }

    const submitNewPostIt = (event) => {
        event.preventDefault();
        if (submitEvent == 1) {console.log("demo post-it created");}
        props.showOtherPages(0);
    }
    
    return(
        <div className='form-background'>
            <Box className='note-container' component="form" 
                 onSubmit={(event) => submitNewPostIt(event)}>

                <div className='note-top'/>

                <TextField placeholder='Title'
                           sx={{
                            height: '10%',
                            padding: '0 5px 0 5px',
                            '& .MuiInputBase-root': {
                              height: '100%',
                              overflowX: 'auto',
                            },
                          }}/>
                <TextField multiline placeholder='Write stuff here...'
                            sx={{
                                height: '42.5%',
                                padding: '0 5px 0 5px',
                                '& .MuiInputBase-root': {
                                  height: '100%',
                                  alignItems: 'flex-start',
                                  overflowY: 'auto',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    height: '400px',
                                 }
                              }}/>
                <TextField placeholder='Image URL' 
                           sx={{
                            height: '10%',
                            width: "75%",
                            padding: '0 5px 0 5px',
                            '& .MuiInputBase-root': {
                              height: '100%',
                              width: '100%',
                              overflowX: 'auto',
                            },
                          }}/>

                <p style={{position: 'absolute',
                           bottom: '10px',
                           left: '10px',
                           margin: '0',
                           fontSize: "45px",
                           fontWeight: "700"}}> - </p>
                <TextField placeholder='Name' 
                           style={{position: 'absolute',
                                   bottom: '5px',
                                   left: '30px'}}/>

                <Wheel color={postItColor} 
                       onChange={(color) => {makePostItColorChanges(color)}}
                       width={75} height={75}
                       style={{position: 'absolute',
                               bottom: '5px',
                               right: '5px'}}/>

                <div style={{position: 'absolute',
                         width: '300px',
                         top: 'calc(100% + 15px)',
                         left: 'calc(50% - 150px)',
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'space-evenly'}}>                   
                    <Button type='submit' 
                            sx={{color: 'black', 
                                backgroundColor: 'rgb(94, 242, 134)',
                                borderRadius: '0',
                                border: "1px solid black",
                                width: '125px'}}>Make Post-It</Button>
                    <Button type='submit' onClick={() => changeSubmitEvent(1)}
                            sx={{color: 'black', 
                                backgroundColor: 'rgb(227, 36, 36)',
                                borderRadius: '0',
                                border: "1px solid black",
                                width: '140px'}}>Cancel Post-It</Button>
                </div>
            </Box>
        </div>
    );
}

export default CreateForm;