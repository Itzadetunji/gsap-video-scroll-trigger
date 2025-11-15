import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { navLinks } from "../constants";

export const Navbar = () => {
	useGSAP(() => {
		const navTween = gsap.timeline({
			scrollTrigger: {
				trigger: "nav",
				start: "bottom top", //When the bottom of the nav hits the top of the viewport
			},
		});

		navTween.fromTo(
			"nav",
			{
				backgroundColor: "transparent",
			},
			{
				backgroundColor: "#00000050",
				backgroundFilter: "blur(10px)",
				duration: 1,
				ease: "power1.inOut",
			}
		);
	}, []);

	return (
		<nav>
			<div>
				<a
					href="#home"
					className="flex items-center gap-2"
				>
					<img
						src="/images/logo.png"
						alt="Logo"
					/>
					<p>Velvet Pour</p>
				</a>

				<ul>
					{navLinks.map((item) => (
						<li
							// href={item.id}
							key={item.id}
						>
							<a href={`#${item.id}`}>{item.title}</a>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};
