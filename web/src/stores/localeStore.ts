import { writable, derived, get } from "svelte/store";
import { fetchNui } from "../utils/fetchNui";
import { NUI_EVENTS } from "../constants/nuiEvents";

export type LocaleDict = Record<string, string>;

interface LocaleState {
	locales: LocaleDict;
	isLoaded: boolean;
}

const initialState: LocaleState = {
	locales: {},
	isLoaded: false,
};

function flattenLocales(
	source: Record<string, any>,
	target: LocaleDict = {},
	prefix = "",
): LocaleDict {
	for (const key in source) {
		const fullKey = prefix ? `${prefix}.${key}` : key;
		const value = source[key];
		if (typeof value === "object" && value !== null && !Array.isArray(value)) {
			flattenLocales(value, target, fullKey);
		} else {
			target[fullKey] = String(value);
		}
	}
	return target;
}

function init() {
	const { subscribe, set, update } = writable<LocaleState>(initialState);

	return {
		subscribe,
		load: async () => {
			if (get({ subscribe }).isLoaded) return;
			try {
				const rawLocales = await fetchNui<Record<string, any>>(
					NUI_EVENTS.MANAGEMENT.GET_LOCALES,
				);
				const locales = flattenLocales(rawLocales);
				update((state) => ({
					...state,
					locales,
					isLoaded: true,
				}));
			} catch (err) {
				console.error("[ps-mdt] Failed to load locales:", err);
			}
		},
		t: (key: string): string => {
			const state = get({ subscribe });
			return state.locales[key] || key;
		},
		reset: () => set(initialState),
	};
}

export const localeStore = init();

export const t = derived(localeStore, ($locale) => {
	return (key: string): string => {
		return $locale.locales[key] || key;
	};
});