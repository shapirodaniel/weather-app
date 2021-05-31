//////////////////////////////
/* SWIPEABLE SLIDE CAROUSEL */
//////////////////////////////

import React, { useState, useEffect, useRef } from 'react';
import SwipeableViews from 'react-swipeable-views';
import styled from 'styled-components';
import { useOnScreen } from '../custom-hooks/useOnScreen';

const PaginationContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1em;
`;

const PageDot = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid ghostwhite;
	border-radius: 50%;
	height: 8px;
	width: 8px;
	margin: 0.6em;
	background-color: ${props => (props.isActive ? 'ghostwhite' : 'transparent')};
	// give a more fluid change to the dot appearance when we swipe
	transition: all 0.2s ease;
`;

// we'll use the activeSlide to compare against the idx of each mapped PageDot instance
// styled-components lets us inject this prop into our css to conditionally render our PageDots -- see background-color above
const Pagination = ({ activeSlide, numPages }) => {
	// get a pageArray to map over and generate our PageDots
	// numPages is length of supplied array to Slides
	const pageArray = new Array(numPages).fill(null);

	return (
		<PaginationContainer>
			{pageArray.map((_, idx) => (
				// isActive boolean flags the active PageDot according to which page is on-screen
				<PageDot key={idx} isActive={activeSlide === idx} />
			))}
		</PaginationContainer>
	);
};

const SlideContainer = styled.div`
	flex-grow: 1;
`;

// children are renderComponent() invocations in Slides
const Slide = ({ number, setActiveSlide, children }) => {
	// assign a slideRef to feed to useOnScreen -- when slide is in viewing area, isOnScreen is true
	// we'll track changes to which component is on screen with useEffect and set state on the parent component
	// this will allow us to track the activeSlide in our Pagination component and render accordingly
	const slideRef = useRef(null);
	const isOnScreen = useOnScreen(slideRef);

	useEffect(() => {
		if (isOnScreen) {
			setActiveSlide(number);
		}
	});

	return <SlideContainer ref={slideRef}>{children}</SlideContainer>;
};

const Slides = ({ slideArray }) => {
	const [activeSlide, setActiveSlide] = useState(0);

	return (
		<>
			<SwipeableViews>
				{
					// components are just functions!
					// we're passing our components generically as a renderComponent fn here so that we can map and invoke without having to know anything about Slide's children -- we'll be able to reuse this Slides component in other apps as well!
					slideArray.map(({ renderComponent }, idx) => (
						<Slide key={idx} number={idx} setActiveSlide={setActiveSlide}>
							{renderComponent()}
						</Slide>
					))
				}
			</SwipeableViews>
			{/* we'll pass a numPages prop to render a PageDot for every slide */}
			<Pagination numPages={slideArray.length} activeSlide={activeSlide} />
		</>
	);
};

// to use the swipeable slide carousel component, supply a slideArray prop structured:
// const slideArray = [ { renderComponent: Component }, ...]
const SwipeCarousel = ({ slideArray }) => <Slides slideArray={slideArray} />;

export default SwipeCarousel;
