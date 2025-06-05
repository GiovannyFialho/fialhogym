import { HistoryDTO } from "@/dtos/history-dto";

export type HistoryByDayDTO = {
  title: string;
  data: HistoryDTO[];
};
