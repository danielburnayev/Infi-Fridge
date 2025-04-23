import {fetchPostItNotes} from '../database/Client';
import {setPostIts} from '../database/PostItCollection';
import PostItContainer from '../components/PostItContainer';
import Navbar from '../components/Navbar';
import CreateForm from './CreateForm';
import EditForm from './EditForm';
import {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [postIts, changePostIts] = useState([]);
  const [otherPages, showOtherPages] = useState(0); // 0 is the here, 1 is create, 2 is edit, 3 is view
  const [sortType, changeSortType] = useState(0); //0 is most recent, 1 is least recent, 2 is best received, 3 is worst received

  useEffect(() => {
    async function wrapperFetchPostIts() {
      const {data, error} = await fetchPostItNotes(sortType);
      changePostIts(data);
      setPostIts(data);
    }
    if (otherPages == 0) {wrapperFetchPostIts();}
  }, [otherPages, sortType]);


  return (
    <div id='app-container'>
      {otherPages == 1 && <CreateForm showOtherPages={showOtherPages} sortType={sortType}/>}
      {otherPages == 2 && <EditForm />}

      <Navbar showOtherPages={showOtherPages} changeSortType={changeSortType}/>

      <div id='left-cab' className='cabinet'>
        <div className='cabinet-rim'/>
        <div className='arm-block' style={{marginLeft: "1vw", marginTop: "2vh"}}/>
        <div className='arm-block' style={{marginLeft: "15vw", marginTop: "2vh"}}/>
        <div className='arm' style={{width: "14.3vw", 
                                     height: "15px", 
                                     marginLeft: "1.5vw", 
                                     marginTop: "2.9vh" }}/>
        
        <div style={{width: "10vw", 
                    height: "12vh", 
                    backgroundColor: "gray",
                    margin: "-15vh 0 0 5vw",
                    border: "2px solid rgb(181, 181, 181)",
                    borderRadius: "0 0 20px 20px"}}/>
        <div style={{width: "5vw", 
                    height: "1vh", 
                    backgroundColor: "gray",
                    margin: "-10.5vh 0 0 0.5vw",
                    border: "1px solid rgb(181, 181, 181)",
                    borderRadius: "0 0 0 10px"}}/>
      </div>

      <div id='fridge'>
        <div id='fridge-gap' />

        {postIts !== null && postIts.length !== 0 && 
          <PostItContainer postIts={postIts}/>}

        <div style={{position: "absolute",
                      width: "65vw",
                      height: "2.5px",
                      bottom: "26vh",
                      backgroundColor: "black"}} />
        <div className='arm-block' style={{bottom: "20vh", left: "22.5vw"}}/>
        <div className='arm-block' style={{bottom: "20vh", right: "22.5vw"}}/>
        <div className='arm-block' style={{bottom: "35vh", left: "45vw"}}/>
        <div className='arm-block' style={{bottom: "35vh", right: "45vw"}}/>
        <div id='left-top-fridge' className='arm-block' />
        <div id='right-top-fridge' className='arm-block' />

        <div className='arm' style={{width: "54vw", 
                                     height: "15px", 
                                     left: "23vw", 
                                     bottom: "19.5vh" }}/>
        <div id='left-fridge-arm' className='arm' />
        <div id='right-fridge-arm' className='arm' />
      </div>

      <div id='right-cab' className='cabinet'> 
        <div className='cabinet-rim'/>
        <div className='arm-block' style={{marginLeft: "1vw", marginTop: "1vh"}}/>
        <div className='arm-block' style={{marginLeft: "1vw", marginTop: "39.5vh"}}/>
        <div className='arm' style={{width: "15px", 
                                     height: "40vh", 
                                     marginLeft: "1.5vw", 
                                     marginTop: "1.5vh" }}/>
        <div style={{width: "2vw",
                     height: "4vh",
                     backgroundColor: "white", 
                     margin: "-10vh 0 0 8.5vw",
                     border: "2px solid rgb(201, 201, 201)",
                     borderRadius: "5px"}} />
        <div style={{width: "5vw",
                     height: "10vh",
                     backgroundColor: "white", 
                     margin: "-7.4vh 0 0 4vw",
                     border: "2px solid rgb(201, 201, 201)",
                     borderRadius: "0 0 15px 15px",
                     display: "flex",
                     placeItems: "center",
                     overflowX: "clip"}}> Scroll Up! </div>
        <div style={{position: "absolute",
                     width: "1vw",
                     height: "2vh",
                     backgroundColor: "rgb(246, 211, 164)", 
                     margin: "-6.4vh 0 0 9.275vw",
                     border: "0.8px solid rgb(201, 201, 201)",
                     borderRadius: "0 5px 5px 0"}} />
      </div>
    </div>
  );
}

export default App
