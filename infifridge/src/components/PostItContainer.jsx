import { useEffect, useState } from "react";
import PostItFront from "./PostItFront";
import './PostItContainer.css';

function PostItContainer(props) {
    const posts = props.postIts;
    const [componentPosts, changeComponentPosts] = useState([]);

    const assignComponentPosts = () => {
        const newArr = [];

        for (let i = 0; i < posts.length; i += 2) {
            newArr.push(
                <div key={`level${i}`} 
                     style={{width: '100%', display: 'flex', gap: '22vw', 
                             margin: '0 -7vw 7vh 0'}}>

                    <PostItFront key={i}
                                title={posts[i].title}
                                color={posts[i].color}
                                author={posts[i].author}
                                votes={posts[i].votes}
                                datePosted={posts[i].created_at}
                                topColor={posts[i].top_color}
                                randRot={25 * Math.random() - 12.5}
                                randMoveX={8 * Math.random() - 4}
                                randMoveY={6.5 * Math.random() - 1.5}
                    />
                    {i + 1 < posts.length && 
                        <PostItFront key={i + 1}
                                title={posts[i + 1].title}
                                color={posts[i + 1].color}
                                author={posts[i + 1].author}
                                votes={posts[i + 1].votes}
                                datePosted={posts[i + 1].created_at}
                                topColor={posts[i + 1].top_color}
                                randRot={25 * Math.random() - 12.5}
                                randMoveX={8 * Math.random() - 4}
                                randMoveY={6.5 * Math.random() - 1.5}
                        />}
                </div>
            );
        }

        changeComponentPosts(newArr);
    }

    const changeSizes = () => {
        const appContainer = document.getElementById('app-container');
        const fridge = document.getElementById('fridge');
        const fridgeGap = document.getElementById('fridge-gap');
        const leftFridgeArm = document.getElementById('left-fridge-arm');
        const rightFridgeArm = document.getElementById('right-fridge-arm');
        const postItContainer = document.getElementById('post-it-container');

        const heightIncrease = Math.floor(posts.length / 7) * 140;
        appContainer.style.height = `${155 + heightIncrease}vh`;
        fridge.style.height = `${140 + heightIncrease}vh`;
        fridgeGap.style.height = `${114 + heightIncrease}vh`;
        leftFridgeArm.style.height = `${94 + heightIncrease}vh`;
        rightFridgeArm.style.height = `${94 + heightIncrease}vh`;
        postItContainer.style.height = `${114 + heightIncrease}vh`;
    }

    useEffect(() => {
        assignComponentPosts();
        changeSizes();
    }, [posts]);


    return(
        <div id='post-it-container'> {componentPosts} </div>
    );
}

export default PostItContainer;