import { MeteoalarmEventType, MeteoalarmLevelType } from './types';
import { Utils } from './utils';

export class MeteoalarmEventInfo {
	constructor(
		public type: MeteoalarmEventType,
		public fullName: string,
		public icon: string,
	) {}

	get translationKey(): string {
		return (
			'events.' +
			this.fullName.toLocaleLowerCase().replace(' ', '_').replace('/', '_').replace('-', '_')
		);
	}
}

export class MeteoalarmLevelInfo {
	constructor(
		public type: MeteoalarmLevelType,
		public fullName: string,
		public cssClass: string,
	) {}

	get translationKey(): string {
		return (
			'messages.' +
			this.fullName.toLocaleLowerCase().replace(' ', '_').replace('/', '_').replace('-', '_')
		);
	}
}

export class MeteoalarmData {
	static get events(): MeteoalarmEventInfo[] {
		// Use some new icons
		if (!Utils.minHAversion(2022, 8)) {
			/* eslint-disable-next-line no-console */
			console.warn(
				'MeteoalarmCard: You are using old HA version! Please update to at least 2022.08 for the best experience.',
			);
		}
		const tsunami = Utils.minHAversion(2022, 6) ? 'tsunami' : 'waves';
		const dust = Utils.minHAversion(2022, 8) ? 'weather-dust' : 'weather-windy';

		// This list should be ordered from most to least dangerous
		return [
			new MeteoalarmEventInfo(MeteoalarmEventType.Nuclear, 'Nuclear Event', 'radioactive'),
			new MeteoalarmEventInfo(MeteoalarmEventType.Hurricane, 'Hurricane', 'weather-hurricane'),
			new MeteoalarmEventInfo(MeteoalarmEventType.Tornado, 'Tornado', 'weather-tornado'),
			new MeteoalarmEventInfo(MeteoalarmEventType.CoastalEvent, 'Coastal Event', tsunami),
			new MeteoalarmEventInfo(MeteoalarmEventType.Tsunami, 'Tsunami', tsunami),
			new MeteoalarmEventInfo(MeteoalarmEventType.ForestFire, 'Forest Fire', 'pine-tree-fire'),
			new MeteoalarmEventInfo(MeteoalarmEventType.Avalanches, 'Avalanches', 'image-filter-hdr'),
			new MeteoalarmEventInfo(MeteoalarmEventType.Earthquake, 'Earthquake', 'image-broken-variant'),
			new MeteoalarmEventInfo(MeteoalarmEventType.Volcano, 'Volcanic Activity', 'volcano-outline'),
			new MeteoalarmEventInfo(MeteoalarmEventType.Flooding, 'Flooding', 'home-flood'),
			new MeteoalarmEventInfo(MeteoalarmEventType.SeaEvent, 'Sea Event', 'ferry'),
			new MeteoalarmEventInfo(
				MeteoalarmEventType.Thunderstorms,
				'Thunderstorms',
				'weather-lightning',
			),
			new MeteoalarmEventInfo(MeteoalarmEventType.Rain, 'Rain', 'weather-pouring'),
			new MeteoalarmEventInfo(MeteoalarmEventType.SnowIce, 'Snow/Ice', 'weather-snowy-heavy'),
			new MeteoalarmEventInfo(
				MeteoalarmEventType.HighTemperature,
				'High Temperature',
				'thermometer',
			),
			new MeteoalarmEventInfo(MeteoalarmEventType.LowTemperature, 'Low Temperature', 'snowflake'),
			new MeteoalarmEventInfo(MeteoalarmEventType.Dust, 'Dust', dust),
			new MeteoalarmEventInfo(MeteoalarmEventType.Wind, 'Wind', 'weather-windy'),
			new MeteoalarmEventInfo(MeteoalarmEventType.Fog, 'Fog', 'weather-fog'),
			new MeteoalarmEventInfo(MeteoalarmEventType.AirQuality, 'Air Quality', 'air-filter'),
			new MeteoalarmEventInfo(MeteoalarmEventType.Unknown, 'Unknown Event', 'alert-circle-outline'),
		];
	}

	static get levels(): MeteoalarmLevelInfo[] {
		return [
			new MeteoalarmLevelInfo(MeteoalarmLevelType.Red, 'Red', 'event-red'),
			new MeteoalarmLevelInfo(MeteoalarmLevelType.Orange, 'Orange', 'event-orange'),
			new MeteoalarmLevelInfo(MeteoalarmLevelType.Yellow, 'Yellow', 'event-yellow'),
			new MeteoalarmLevelInfo(MeteoalarmLevelType.None, 'None', 'event-none'),
		];
	}

	static getEvent(type: MeteoalarmEventType): MeteoalarmEventInfo {
		return this.events.find((e) => e.type === type)!;
	}

	static getLevel(type: MeteoalarmLevelType): MeteoalarmLevelInfo {
		return this.levels.find((e) => e.type === type)!;
	}
}
