import PostItFront from '../components/PostItFront';
import CreateForm from './CreateForm';
import {fetchPostItNoteByTitle, updatePostsVotesByTitle, deletePostItByTitle, fetchComments} from '../database/Client';
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
    const [theComments, changeTheComments] = useState([]);
    const [rerenderer, changeRerenderer] = useState(true);
    const [pageNum, changePageNum] = useState(0);

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

        async function makeVisiblePostItComments() {
            const newArr = [];
            const {data, error} = await fetchComments(postItTitle);
            console.log(data);

            if (data != null) {
                for (let i = 0; i < data.length; i += 3) {
                    newArr.push(
                        <div key={`level${i}comments`} 
                            style={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
        
                            <PostItFront key={`comment${i}`}
                                        title={data[i].title}
                                        color={data[i].color}
                                        author={data[i].author}
                                        votes={data[i].votes}
                                        datePosted={data[i].created_at}
                                        topColor={data[i].top_color}
                                        randRot={0}
                                        randMoveX={0}
                                        randMoveY={0}
                            />

                            {i + 1 < data.length &&  
                                <PostItFront key={`comment${i + 1}`}
                                        title={data[i + 1].title}
                                        color={data[i + 1].color}
                                        author={data[i + 1].author}
                                        votes={data[i + 1].votes}
                                        datePosted={data[i + 1].created_at}
                                        topColor={data[i + 1].top_color}
                                        randRot={0}
                                        randMoveX={0}
                                        randMoveY={0}
                                />}

                            {i + 2 < data.length &&  
                                <PostItFront key={`comment${i + 2}`}
                                        title={data[i + 2].title}
                                        color={data[i + 2].color}
                                        author={data[i + 2].author}
                                        votes={data[i + 2].votes}
                                        datePosted={data[i + 2].created_at}
                                        topColor={data[i + 2].top_color}
                                        randRot={0}
                                        randMoveX={0}
                                        randMoveY={0}
                                />}
                        </div>
                    );
                }
            }
            changeTheComments(newArr);
        }

        wrapperFetchPostIt();
        makeVisiblePostItComments();
    }, [rerenderer, postItTitle, pageNum]);

    return(
        <>
            {thePostIt != null && 
                <div id='view-container'>
                    {pageNum == 1 && 
                        <CreateForm formTitle='Edit your Post-It Note'
                            showOtherPages={changePageNum} 
                            sortType={null}
                            givenPostIt={thePostIt}
                            parentPostItTitle={null}/>
                    }
                    {pageNum == 2 && 
                        <CreateForm formTitle='Create your comment'
                            showOtherPages={changePageNum} 
                            sortType={null}
                            givenPostIt={null}
                            parentPostItTitle={postItTitle}/>
                    }

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
                                         marginRight: '10px'}}>
                                            Delete
                            </Button>

                            <Button onClick={() => changePageNum(1)}
                                    sx={{color: 'black',
                                         backgroundColor: `${thePostIt.color}`,
                                         borderRadius: '0',
                                         height: '75%',
                                         marginRight: '10px'}}>
                                            Edit
                            </Button>

                            <Button onClick={() => navigate('/')}
                                    sx={{color: 'black',
                                         backgroundColor: `${thePostIt.color}`,
                                         borderRadius: '0',
                                         height: '75%',
                                         marginRight: '10px'}}>
                                            Leave
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

                            <p style={{whiteSpace: 'pre-line', margin: '5px 0 0 5px'}}>
                                {`${thePostIt.text_content}`}
                            </p>
                            <img src={thePostIt.img_url}
                                 style={{maxWidth: '100%', margin: '5px 0 0 5px'}}/>
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

                    <h1 style={{marginBottom: '5px'}}>Comments:</h1>
                    <Button onClick={() => changePageNum(2)}
                            sx={{color: 'black',
                                backgroundColor: 'yellow',
                                borderRadius: '0',
                                border: '0.5px solid black',
                                margin: '5px 0 5px 0'}}> 
                                    Add Comment
                    </Button>
                    {theComments != null && theComments.length > 0 &&
                        <div style={{width: '90%', border: '1px solid black'}}> 
                            {theComments}
                        </div>
                    }
                    
                </div>
            }
        </>
    );
}

export default ViewPage;