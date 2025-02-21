import React from "react";
function TrackList({request, callback}){
    const results='this is the result';
    /*Request will be used to search spotifies data base and will return the tracks matching the search which will then be sent to SearchResults and displayed to the user*/
    return <div callback={callback(results)}></div>;
}
export default TrackList;