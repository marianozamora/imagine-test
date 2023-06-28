import { default as Logito } from "./logo.png";
import Image from "next/image";

export default function Logo(props: {
	textClass: string;
	width: number;
	height: number;
	isotype?: boolean;
	containerClass?: string;
	}) {
	const { textClass, width, height, isotype, containerClass } = props;
	return (
		<div className={`flex items-center ${containerClass}`}>
			{!isotype && (
				<Image src={Logito} alt="logo" width={width} height={height} />
			)}

			<div className={textClass}>Imagine</div>
		</div>
	);
}
