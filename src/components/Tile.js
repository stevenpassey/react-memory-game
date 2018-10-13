import React from "react";

function Tile(props) {
  return (
    <div id={props.id} className={"tile " +  props.color} onClick={props.cbProp}>
      {props.number}
	  <div className="no-jitter">
	  </div>
    </div>
  );
}

export default Tile