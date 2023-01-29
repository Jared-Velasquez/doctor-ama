import React from 'react';
import { Badge } from 'react-bootstrap';
import './ConversationList.css';

// attribution time2TimeAgo: https://stackoverflow.com/questions/19540077/converting-unix-time-to-minutes-ago-in-javascript
// username: sitifensys
function time2TimeAgo(ts) {
    // This function computes the delta between the
    // provided timestamp and the current time, then test
    // the delta for predefined ranges.

    var d=new Date();  // Gets the current time
    var nowTs = Math.floor(d.getTime()/1000); // getTime() returns milliseconds, and we need seconds, hence the Math.floor and division by 1000
    var seconds = nowTs-Math.floor(ts/1000.0);

    // more that two days
    if (seconds > 2*24*3600) {
       return "A few days ago";
    }
    // a day
    if (seconds > 24*3600) {
       return "Yesterday";
    }

    if (seconds > 3600) {
       return "A few hours ago";
    }
    if (seconds > 1800) {
       return "Half an hour ago";
    }
    if (seconds > 60) {
       return Math.floor(seconds/60) + " minutes ago";
    }
    else {
        return "Just now";
    }
}

function ConversationList (props) {
    const dummy_cl = {
        status: "boolean",
        result: [
            {convoID: "afjfieopjefaopi", unread: false, displayName: "Jor briun",
                icon: "<string image link>?? idk", timestamp: 1674955189943},
            {convoID: "ajefpoiajpaesop", unread: true, displayName: "Anonymous Rabbit",
                icon: "<string image link>?? idk", timestamp: 1674955209943},
            {convoID: "ajefoijaepjpoai", unread: false, displayName: "Foo bar",
                icon: "<string image link>?? idk", timestamp: 1674955199943}
          ]
        }
        if(!dummy_cl.status || dummy_cl.result?.length === 0) {
            return (
                <p class="doctorlist-centermsg">No conversations... yet &#128532;</p>
            )
        }
        return (
            <div class="convolist-overall">
                {dummy_cl.result.map((convo, i) => {
                    return (
                        <div class="convolist-pad">
                        <table class="convolist-entry" onClick={props.entry}>
                            <tr>
                                <td class="convolist-td">
                                    <img src={convo.icon} class="convolist-image"/>
                                </td>
                                <td class="convolist-td">
                                    <h4>
                                        {convo.unread ? <b>{convo.displayName + " "}</b> : <>{convo.displayName}</>}{convo.unread ? <Badge pill bg="danger">&#128276;</Badge> : null}
                                    </h4>
                                    <p class="convolist-ts">{time2TimeAgo(convo.timestamp)}</p>
                                </td>

                            </tr>
                        </table>
                        </div>
                    );
                })}
                
            </div>
        );
}

export default ConversationList;