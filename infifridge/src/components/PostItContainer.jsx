import { useEffect, useState } from "react";
import PostItFront from "./PostItFront";

function PostItContainer(props) {
    const posts = props.postIts;
    const [componentPosts, changeComponentPosts] = useState([]);

    const assignComponentPosts = () => {
        const newArr = [];
        for (var i = 0; i < posts.length; i += 2) {
            newArr.push(
                <div key={`level${i}`} 
                     style={{width: '65vw', display: 'flex', gap: '24vw', 
                             marginTop: '7vh', marginLeft: '6vw'}}>

                    <PostItFront key={i}
                                title={posts[i].title}
                                color={posts[i].color}
                                randRot={25 * Math.random() - 12.5}
                                randMoveX={8 * Math.random() - 4}
                                randMoveY={8 * Math.random() - 4}
                    />
                    {i + 1 < posts.length && 
                        <PostItFront key={i + 1}
                                title={posts[i + 1].title}
                                color={posts[i + 1].color}
                                randRot={25 * Math.random() - 12.5}
                                randMoveX={8 * Math.random() - 4}
                                randMoveY={8 * Math.random() - 4}
                        />}
                </div>
            );
        }

        changeComponentPosts(newArr);
    }

    const changeSizes = () => {
        const root = document.getElementById('root');
        const fridge = document.getElementById('fridge');
        const fridgeGap = document.getElementById('fridge-gap');
        const leftFridgeArm = document.getElementById('left-fridge-arm');
        const rightFridgeArm = document.getElementById('right-fridge-arm');
        const postItContainer = document.getElementById('post-it-container');

        const heightIncrease = Math.floor(posts.length / 7) * 140;
        root.style.height = `${155 + heightIncrease}vh`;
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
        <div id='post-it-container'>
            {componentPosts}
        </div>
    );
}

export default PostItContainer;