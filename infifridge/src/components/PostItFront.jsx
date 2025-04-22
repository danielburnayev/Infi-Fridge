import check from '../assets/checkmark.png';
import './PostItFront.css';

function PostItFront(props) {
    const readableTime = props.datePosted.substring(0, 16).replace('T', ', ');

    return(
        <div className='post-it-front' style={{backgroundColor: `${props.color}`,
                     rotate: `${props.randRot}deg`, 
                     translate: `${props.randMoveX}vw ${props.randMoveY}vh`}}>
            <div style={{width: '15vw', height: '5vh', 
                         backgroundColor: `${props.topColor}`}}/> 

            <p style={{margin: '2.5px 0 0 2.5px'}}>{readableTime}</p>

            <div style={{width: '15vw', height: '15vh', overflowY: 'auto',
                            display: 'flex', flexDirection: 'column', 
                            alignItems: 'center'}}>    
                <h1 style={{padding: '0 5px 0 5px', margin: '0'}}>{props.title}</h1>
            </div>

            <div style={{position: 'absolute', left: '0', bottom: '0', width: '15vw',
                            display: 'flex', justifyContent: 'space-between',
                            marginRight: '2.5px'}}>
                <div style={{width: '10.25vw', marginLeft: '3px'}}>
                    <h3 style={{overflowX: 'scroll', overflowY: 'none', textWrap: 'nowrap'}}>
                        {`-${props.author}`}
                    </h3>
                </div>
                <div style={{display: 'flex', alignItems: 'center', marginRight: '3px'}}>
                    <h3 style={{marginRight: '3px'}}>{`${props.votes}`}</h3>
                    <img src={check} style={{height: '4.5vh', width: '2.25vw'}}/>
                </div>
            </div>
        </div>
    );
}

export default PostItFront;