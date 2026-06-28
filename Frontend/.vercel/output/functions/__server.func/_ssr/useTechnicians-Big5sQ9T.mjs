import { n as apiClient, t as API_ENDPOINTS } from "./api-client-D0rzRozx.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useTechnicians-Big5sQ9T.js
var techniciansService = {
	getAll: async () => {
		return (await apiClient.get(API_ENDPOINTS.TECHNICIANS.GET_ALL)).data;
	},
	getJobs: async (id) => {
		return (await apiClient.get(API_ENDPOINTS.TECHNICIANS.GET_JOBS(id))).data;
	},
	getSchedule: async (id) => {
		return (await apiClient.get(API_ENDPOINTS.TECHNICIANS.GET_SCHEDULE(id))).data;
	},
	updateAvailability: async (id, status) => {
		return (await apiClient.patch(API_ENDPOINTS.TECHNICIANS.UPDATE_AVAILABILITY(id), { status })).data;
	}
};
function useFetchTechnicians() {
	return useQuery({
		queryKey: ["technicians"],
		queryFn: techniciansService.getAll
	});
}
//#endregion
export { useFetchTechnicians as t };
