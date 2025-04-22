import { Link } from "react-router-dom";

function ViewPage() {
    return(
        <div id='view-container'>
            This is the view page of __
            {/* show the view of the selected post-it (make it a PRETTY big post-it) */}
                {/* Can scroll further down to see more text/image in the post it */}
        </div>

            // Allow a section below the main post-it to leave a comment
            // it'll lexad be another way to lead to the create form
            // make sure when posted, it appears as a comment for the main post-it AND a post-it on the fridge

            // After scrolling through the post-it, show post-it comments of the main post-it
            // In 3 column grid with an many rows necesary
            // basically going to be a bunch of PostItFronts
    );
}

export default ViewPage;