"use client";

import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import type { ReactNode } from "react";
import "./custom-slider.css";
import { NextButton, PrevButton, usePrevNextButtons } from "./CustomSliderArrowButton";
import { DotButton, useDotButton } from "./CustomSliderDot";

type PropType = {
	slides: ReactNode[];
	options?: EmblaOptionsType;
};

export const CustomSlider = (props: PropType) => {
	const { slides, options } = props;
	const [emblaRef, emblaApi] = useEmblaCarousel({ ...options, loop: true });
	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
		usePrevNextButtons(emblaApi);

	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

	return (
		<div className="embla">
			<div className="embla__stage">
				<div className="embla__viewport" ref={emblaRef}>
					<div className="embla__container">
						{slides.map((slide, index) => (
							<div key={`embla-slide-${String(index)}`} className="embla__slide min-h-[30rem]">
								{slide}
							</div>
						))}
					</div>
				</div>

				<div className="embla__buttons">
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
				</div>

				<div className="embla__dots">
					{scrollSnaps.map((snap, index) => (
						<DotButton
							key={`${String(snap)}-${String(index)}`}
							onClick={() => onDotButtonClick(index)}
							className={"embla__dot".concat(
								index === selectedIndex ? " embla__dot--selected" : "",
							)}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
