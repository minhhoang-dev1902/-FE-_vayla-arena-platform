export const NAVIGATE = {
	HOME: "/home",
	MY_PAGE: "/my-page",
	BOOST: "/boost",
	boostDetail: (id: string) => `/boost/${encodeURIComponent(id)}`,
	boostParticipate: (id: string) => `/boost/${encodeURIComponent(id)}/participate`,
	DISCOVERY: "/discovery",
	SUBMIT_TRACK: "/discovery/submit-track",
	SUBMIT_TRACK_SUCCESS: "/discovery/submit-track/success",
	SUBMIT_TRACK_ERROR: "/discovery/submit-track/error",
	MY_SUBMISSIONS: "/discovery/my-submission",
	VOTE_TRACK: (id: string) => `/discovery/${encodeURIComponent(id)}/vote-track`,
};
