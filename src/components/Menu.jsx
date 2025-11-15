import React from "react";

import { sliderLists } from "../constants/index";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const Menu = () => {
	const [currentIndex, setCurrentIndex] = React.useState(0);
	const contentRef = React.useRef(null);

	const goToSlide = (index) => {
		setCurrentIndex((index + 4) % sliderLists.length);
	};

	const getCocktailAt = (index) => {
		const adjustedIndex =
			(currentIndex + index + sliderLists.length) % sliderLists.length;
		return sliderLists[adjustedIndex];
	};

	const currentCocktail = getCocktailAt(0);
	const prevCocktail = getCocktailAt(-1);
	const nextCocktail = getCocktailAt(1);

	useGSAP(() => {
		const timeline = gsap.timeline();
		timeline.fromTo(
			"#title",
			{ opacity: 0 },
			{ opacity: 1, duration: 1, ease: "power1.inOut" }
		);
		timeline.fromTo(
			".cocktail img",
			{
				opacity: 0,
				xPercent: -100,
			},
			{
				opacity: 1,
				xPercent: 0,
				duration: 1,
				ease: "power1.inOut",
			},
			"-=1"
		);
		timeline.fromTo(
			".details h2",
			{
				yPercent: 100,
				opacity: 0,
			},
			{
				yPercent: 0,
				opacity: 1,
				duration: 1,
				ease: "power1.inOut",
			},
			"-=0.4"
		);
		timeline.fromTo(
			".details p",
			{
				yPercent: 100,
				opacity: 0,
			},
			{
				yPercent: 0,
				opacity: 1,
				duration: 1,
				ease: "power1.inOut",
			},
			"-=0.8"
		);
	}, [currentIndex]);

	return (
		<section
			id="menu"
			aria-labelledby="menu-heading"
		>
			<img
				src="/images/slider-left-leaf.png"
				alt="left-leaf"
				id="m-left-leaf"
			/>
			<img
				src="/images/slider-right-leaf.png"
				alt="right-leaf"
				id="m-right-leaf"
			/>

			<h2
				id="menu-heading"
				className="sr-only"
			>
				Cocktail Menu
			</h2>
			<nav
				className="cocktail-tabs"
				aria-label="Cocktail Navigation"
			>
				{sliderLists.map((item, index) => {
					const isActive = index === currentIndex;

					return (
						<button
							key={item}
							type="button"
							className={`tab-button ${
								isActive
									? "text-white border-white"
									: "text-white/50 border-white/50"
							}`}
							onClick={() => goToSlide(index)}
						>
							{item.name}
						</button>
					);
				})}
			</nav>

			<div className="content">
				<div className="arrows">
					<button
						className="text-left"
						type="button"
						onClick={() => goToSlide(currentIndex - 1)}
					>
						<span>{prevCocktail.name}</span>
						<img
							src="/images/right-arrow.png"
							alt="right-arrow"
							aria-hidden="true"
						/>
					</button>
					<button
						className="text-left"
						type="button"
						onClick={() => goToSlide(currentIndex + 1)}
					>
						<span>{nextCocktail.name}</span>
						<img
							src="/images/left-arrow.png"
							alt="left-arrow"
							aria-hidden="true"
						/>
					</button>
				</div>

				<div className="cocktail">
					<img
						src={currentCocktail.image}
						className="object-contain"
						alt=""
					/>
				</div>

				<div className="recipe">
					<div
						ref={contentRef}
						className="info"
					>
						<p>Recipe for:</p>
						<p id="title">{currentCocktail.name}</p>
					</div>
					<div className="details">
						<h2>{currentCocktail.title}</h2>
						<p>{currentCocktail.description}</p>
					</div>
				</div>
			</div>
		</section>
	);
};
