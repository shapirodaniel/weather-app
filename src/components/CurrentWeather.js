import React from 'react';
import styled from 'styled-components';
import {
	getImperialTemp,
	getMetricTemp,
} from '../custom-hooks/helpers/one-call/oneCallParsers';

// refresh icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

// date time
const DateTime = styled.span`
	font-size: 18px;
	color: ghostwhite;
`;

// daily hi, low temps
const HiLo = styled.span`
	font-size: 18px;
	color: ghostwhite;
	padding: 0.2em;
`;

const HighAndLow = ({ high, low, isImperial }) => (
	<div style={{ color: 'ghostwhite' }}>
		<HiLo>{`Hi: ${
			isImperial ? getImperialTemp(high) + '°' : getMetricTemp(high) + '°'
		}`}</HiLo>
		{' • '}
		<HiLo>{`Low: ${
			isImperial ? getImperialTemp(low) + '°' : getMetricTemp(low) + '°'
		}`}</HiLo>
	</div>
);

// current temp
const Temperature = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 80px;
	color: ghostwhite;
`;

const DegreeSymbol = styled.span`
	font-size: 48px;
	margin-top: -0.4em;
`;

// feels like temp
const FeelsLike = styled.div`
	font-size: 16px;
	color: ghostwhite;
`;

// current weather icon and description
const IconContainer = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.3em;
	// brightness filter punches up some of the washed-out open weather api icons like "mist"
	filter: brightness(150%);
`;

const Description = styled.span`
	font-size: 18px;
	color: ghostwhite;
	margin-top: -1em;
	margin-bottom: 2em;
`;

const IconAndDescription = ({ icon, description }) => (
	<div
		style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
		}}
	>
		<IconContainer>
			<img src={icon} alt={'weather-icon'} />
		</IconContainer>
		<Description>{description}</Description>
	</div>
);

// selected city
const CityName = styled.span`
	font-size: 30px;
	color: ghostwhite;
	padding-top: 1em;
	text-align: center;
`;

const CurrentWeather = ({
	temp,
	feelsLike,
	weatherDescription,
	weatherIcon,
	isImperial,
	cityName,
	dateTime,
	highTemp,
	lowTemp,
	refresh,
}) => {
	if (!temp)
		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					fontSize: '22px',
					color: 'ghostwhite',
				}}
			>
				Loading ...
			</div>
		);

	return (
		<>
			<DateTime>{dateTime}</DateTime>

			<div style={{ textAlign: 'center' }}>
				<HighAndLow
					high={highTemp}
					low={lowTemp}
					isImperial={isImperial}
					refresh={refresh}
				/>

				<Temperature>
					{isNaN(temp)
						? ''
						: isImperial
						? getImperialTemp(temp)
						: getMetricTemp(temp)}
					<DegreeSymbol>{isImperial ? '°F' : '°C'}</DegreeSymbol>
				</Temperature>

				<FeelsLike>
					Feels like:{' '}
					{isImperial ? getImperialTemp(feelsLike) : getMetricTemp(feelsLike)}
					{'°'}
				</FeelsLike>
			</div>

			<IconAndDescription icon={weatherIcon} description={weatherDescription} />

			<FontAwesomeIcon
				style={{
					color: 'ghostwhite',
					height: '20px',
					width: 'auto',
				}}
				icon={faRedo}
				onClick={() => refresh()}
			/>

			<CityName>{cityName}</CityName>
		</>
	);
};

export default CurrentWeather;
