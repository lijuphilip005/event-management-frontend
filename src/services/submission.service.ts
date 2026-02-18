import api from "./api";

export const submitEventForm = async (
  eventId: string,
  formData: FormData
) => {
  const res = await api.post(
    `/event/${eventId}/submit`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};


export const getSubmissionsByEvent = async (eventId: string) => {
  const res = await api.get(`/event/${eventId}/submissions`);
  return res.data;
};

export const approveSubmission = async (id: string) => {
  const res = await api.patch(`/event/submission/${id}/approve`);
  return res.data;
};

export const getPrintUsers = async (eventId: string) => {
  const res = await api.get(`/event/${eventId}/print`);
  return res.data;
};

export const getAllSubmissions = async () => {
  const res = await api.get("event/submissions");
  return res.data;
};
