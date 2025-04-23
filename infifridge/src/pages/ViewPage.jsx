import PostItFront from '../components/PostItFront';
import CreateForm from './CreateForm';
import {fetchPostItNoteByTitle, updatePostsVotesByTitle, deletePostItByTitle} from '../database/Client';
import check from '../assets/checkmark.png';
import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import './ViewPage.css';
import '../pages/Pages.css';

function ViewPage() {
    const params = useParams();
    const navigate = useNavigate();
    const postItTitle = params.postItTitle.replaceAll("-", " ");
    const [thePostIt, changeThePostIt] = useState(null);
    const [rerenderer, changeRerenderer] = useState(true);

    const likePostIt = async () => {
        await updatePostsVotesByTitle(postItTitle, thePostIt.votes + 1);
        changeRerenderer(!rerenderer);
    }

    const deletePostIt = async () => {
        await deletePostItByTitle(postItTitle);
        navigate('/');
    }

    useEffect(() => {
        async function wrapperFetchPostIt() {
            const {data, error} = await fetchPostItNoteByTitle(postItTitle);
            changeThePostIt(data);
        }

        wrapperFetchPostIt();
    }, [rerenderer]);

    return(
        <>
            {thePostIt != null && 
                <div id='view-container'>
                    <div style={{width: '35vw', height: '70vh', 
                                border: '1px solid black', 
                                marginTop: '5vh',
                                backgroundColor: `${thePostIt.color}`}}>
                        
                        <div className='post-it-top' 
                             style={{backgroundColor: `${thePostIt.top_color}`}}> 
                            <Button onClick={deletePostIt}
                                    sx={{color: 'black',
                                         backgroundColor: `${thePostIt.color}`,
                                         borderRadius: '0',
                                         height: '75%',
                                         marginRight: '5px'}}>
                                            Delete
                            </Button>
                        </div>
                        
                        <p style={{marginBottom: '0', marginLeft: '5px'}}>
                            {`${thePostIt.created_at.substring(0, 16).replace('T', ', ')} UTC`}
                        </p>
                        <h1 style={{textAlign: 'center', 
                                    margin: '0 auto 0 auto'}}>
                                        {thePostIt.title}
                        </h1>
                        
                        <div style={{width: 'calc(100% - 10px)', height: '50%', 
                                     overflowY: 'scroll',
                                     border: '0.5px solid black', 
                                     margin: '5px 0 0 5px'}}>

                            <p style={{whiteSpace: 'pre-line', margin: '0'}}>
                                {`${thePostIt.text_content}`}
                            </p>
                            <img src={(thePostIt.img_url == '') ? null : thePostIt.img_url}
                                 style={{maxWidth: '100%'}}/>
                        </div>
                        
                        <div style={{display: 'flex', 
                                    justifyContent: 'space-between'}}>
                            <h2 style={{marginLeft: '2.5px'}}>{`-${thePostIt.author}`}</h2>
                            
                            <div onClick={likePostIt}
                                 style={{display: 'flex', alignItems: 'center', 
                                         marginRight: '2.5px', gap: '7.5px', 
                                         cursor: 'pointer'}}>

                                <h3>{`${thePostIt.votes}`}</h3>
                                <img src={check} style={{height: '4.5vh', width: '2.25vw'}}/>
                            </div>
                        </div>
                    </div>

                    <h1>Comments:</h1>
                    <div style={{width: '90%', border: '1px solid black'}}/>
                    
                    {/* show the view of the selected post-it (make it a PRETTY big post-it) */}
                        {/* Can scroll further down to see the text/image in the post-it */}
                </div>
            }
        </>

            // Allow a section below the main post-it to leave a comment
            // it'll lexad be another way to lead to the create form
            // make sure when posted, it appears as a comment for the main post-it AND a post-it on the fridge

            // After scrolling through the post-it, show post-it comments of the main post-it
            // In 3 column grid with an many rows necesary
            // basically going to be a bunch of PostItFronts
    );
}

export default ViewPage;