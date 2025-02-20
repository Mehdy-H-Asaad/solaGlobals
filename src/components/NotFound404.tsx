import notFoundImg from "../assets/imgs/Page-not-found.svg";
export const NotFound404 = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen gap-10 ">
			<img className="size-96" src={notFoundImg} alt="" />
			<p className="font-bold text-2xl">404 Not Found</p>
		</div>
	);
};
