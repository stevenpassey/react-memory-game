import React from "react";

function Tileset (props) {
		return (
			<section className={props.gray}>
				{props.content}
			</section>
	);
}

export default Tileset;