import './PostItFront.css';

function PostItFront(props) {
    return(
        <div className='post-it-front' style={{backgroundColor: `${props.color}`,
                     rotate: `${props.randRot}deg`, 
                     translate: `${props.randMoveX}vw ${props.randMoveY}vh`}}> 
            <h2>{props.title}</h2>
        </div>
    );
}

export default PostItFront;