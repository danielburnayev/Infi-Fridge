import {insertPostItNote, fetchPostItNotes, fetchPostItNoteByTitle, updatePostItByTitle, addCommentToPostItByTitle} from '../database/Client';
import {setPostIts} from '../database/PostItCollection';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {Wheel} from '@uiw/react-color';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './Pages.css';

function EditablePostIt(props) {
    const postIt = props.givenPostIt;
    const navigate = useNavigate();
    const [postItColor, changePostItColor] = useState((postIt != null) ? postIt.color : '#FFFF00'); //yellow
    const [postItTopColor, changePostItTopColor] = useState((postIt != null) ? postIt.top_color : '#e5e100'); //darker yellow
    const [submitEvent, changeSubmitEvent] = useState(0);
    
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
        changePostItTopColor(darkerItsHex);
        theNote.style.backgroundColor = itsHex;
        noteTop.style.backgroundColor = darkerItsHex;
    }

    const submitNewPostIt = async (event) => {
        event.preventDefault();

        var titleSearchResult;
        if (submitEvent == 2 || (submitEvent != 0 &&
            event.target[0].value.length != 0 && 
            event.target[7].value.length != 0)) {
                const {data, error} = await fetchPostItNoteByTitle(event.target[0].value);
                titleSearchResult = data;
                
                if (submitEvent == 1 && titleSearchResult == null) {
                    if (postIt == null) {
                        await insertPostItNote(event, postItColor, postItTopColor, props.parentPostItTitle);
                        
                        if (props.parentPostItTitle != null) {
                            await addCommentToPostItByTitle(props.parentPostItTitle, event.target[0].value);
                        }
                    } //add new data
                    else if (postIt != null || props.sortType == null) {
                        await updatePostItByTitle(postIt.title,
                                                    event.target[7].value,
                                                    event.target[0].value,
                                                    event.target[2].value,
                                                    postItColor, 
                                                    postItTopColor,
                                                    event.target[5].value);
                    } //update data in the database (edit)

                    const {data, error} = await fetchPostItNotes(props.sortType);
                    setPostIts(data);
                    if (postIt != null) {navigate(`/edit/${event.target[0].value.replaceAll(" ", "-")}`);}

                    props.showOtherPages(0);
                }
                else if (submitEvent == 2) {props.showOtherPages(0);}
        }

        if (event.target[0].value.length == 0 || titleSearchResult != null) {
            const titleBorder = document.getElementsByClassName('square-borders')[0];
            const titleField = document.getElementById('title-textfield');

            titleBorder.classList.add('shake-animation');
            titleField.classList.add('shake-animation');
            const thing = setTimeout(() => {
                titleBorder.classList.remove('shake-animation');
                titleField.classList.remove('shake-animation');
                clearTimeout(thing);
            }, 330);
        }
        if (event.target[7].value.length == 0) {
            const nameField = document.getElementById('name-textfield');

            nameField.classList.add('shake-animation');
            const thing = setTimeout(() => {
                nameField.classList.remove('shake-animation');
                clearTimeout(thing);
            }, 330);
        }
    }

    return(
        <Box className='note-container' component="form" 
                onSubmit={(event) => submitNewPostIt(event)}>

            <div className='note-top' />

            <div className='square-borders'
                    style={{top: 'calc(7.5vh + 10px)',
                            height: '9.5%',
                            width: '95.5%'}}/>
            <div className='square-borders'
                    style={{top: 'calc(7.5vh + 10% + 20px)',
                            height: '42%',
                            width: '95.5%'}}/>
            <div className='square-borders'
                    style={{top: 'calc(7.5vh + 52.5% + 30px)',
                            height: '9.5%',
                            width: '72.625%'}}/>

            <div id='title-textfield'>
                <TextField placeholder='Title' defaultValue={(postIt != null) ? postIt.title : ''}
                        sx={{
                            height: '6vh',
                            width: '32.25vw',
                            padding: '0 5px 0 5px',
                            marginTop: '1.25vh',
                            '& .MuiInputBase-root': {
                                height: '100%',
                                overflowX: 'auto',
                                fontWeight: '700',
                                overflowY: 'clip',
                            },
                            '& .MuiInputBase-root.Mui-focused': {
                                '& fieldset': {border: 'none',},
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderWidth: '0',
                            }
                        }}/>
            </div>
            <TextField multiline placeholder='Write stuff here... (optional)' 
                        defaultValue={(postIt != null) ? postIt.text_content : ''}
                        sx={{
                            height: '25.5vh',
                            width: '32.25vw',
                            padding: '0 5px 0 5px',
                            marginTop: '1.25vh',
                            '& .MuiInputBase-root': {
                                height: '25.5vh',
                                alignItems: 'flex-start',
                                overflowY: 'auto',
                            },
                            '& .MuiInputBase-root.Mui-focused': {
                                '& fieldset': {border: 'none',},
                                },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderWidth: '0',
                                }
                            }}/>
            <TextField placeholder='Image URL (optional)' 
                        sx={{
                        height: "6vh",
                        width: "75%",
                        padding: '0 5px 0 5px',
                        marginTop: '1.25vh',
                        '& .MuiInputBase-root': {
                            height: '100%',
                            width: '100%',
                            overflowX: 'auto',
                            overflowY: 'clip',
                        },
                        '& .MuiInputBase-root.Mui-focused': {
                            '& fieldset': {border: 'none',},
                            },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderWidth: '0',
                            }
                        }}/>

            <div id='name-textfield' style={{display: 'flex', marginTop: '3vh'}}>
                <p style={{margin: '5px 0 0 5px', fontSize: "30px", fontWeight: "700"}}> - </p>
                <TextField placeholder='Name' defaultValue={(postIt != null) ? postIt.author : ''}
                        sx={{'& .MuiOutlinedInput-notchedOutline': {
                                    border: '1px solid black',
                                    borderRadius: '0',
                                },
                            '& .MuiInputBase-root.Mui-focused': {
                                '& fieldset': {border: '1px solid black',},
                                },
                            }}/>
            </div>

            <Wheel color={postItColor} 
                    onChange={(color) => {makePostItColorChanges(color)}}
                    width={75} height={75}
                    style={{position: 'absolute',
                            bottom: '5px',
                            right: '5px',
                            border: '0.75px solid black',
                            borderRadius: '37.5px'}}/>

            <div style={{position: 'absolute',
                        width: '300px',
                        top: 'calc(100% + 15px)',
                        left: 'calc(50% - 150px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-evenly'}}>                   
                <Button type='submit'
                        onClick={() => changeSubmitEvent(1)}
                        sx={{color: 'black', 
                            backgroundColor: 'rgb(94, 242, 134)',
                            borderRadius: '0',
                            border: "1px solid black",
                            width: '125px'}}>Make Post-It</Button>
                <Button type='submit'
                        onClick={() => changeSubmitEvent(2)}
                        sx={{color: 'black', 
                            backgroundColor: 'rgb(227, 36, 36)',
                            borderRadius: '0',
                            border: "1px solid black",
                            width: '140px'}}>Cancel Post-It</Button>
            </div>
        </Box>
    );
}

export default EditablePostIt;