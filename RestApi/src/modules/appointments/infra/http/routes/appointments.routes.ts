import { Router } from "express";
import { parseISO } from "date-fns";

import CreateAppoinmentService from "@modules/appointments/services/CreateAppointmentService";
import { container } from 'tsyringe';

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticate";

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get("/", async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post("/", async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppoinmentService);

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
