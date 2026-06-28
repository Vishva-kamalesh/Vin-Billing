import { useQuery } from "@tanstack/react-query";
import { warrantiesService } from "../services/warranties.service";

export function useFetchWarranties() {
  return useQuery({
    queryKey: ["warranties"],
    queryFn: warrantiesService.getAll,
  });
}
