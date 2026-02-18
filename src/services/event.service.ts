import api from "./api";
export interface CreateEventPayload {
  name: string;
  date: string;
  details: string;
}

export const getEvents = async () => {
  const res = await api.get("/events");
  return res.data;
};


export const createEvent = async (data: CreateEventPayload) => {
  const res = await api.post("/events", data);
  return res.data;
};