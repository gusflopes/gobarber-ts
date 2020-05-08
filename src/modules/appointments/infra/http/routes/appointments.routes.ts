import { Router } from 'express';
import checkJwt from '@shared/infra/http/middlewares/checkJwt';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(checkJwt);

appointmentsRouter.post('/', appointmentsController.store);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });

// appointmentsRouter.get('/:id', async (request, response) => {
//   const { id } = request.params;
//   const appointment = await appointmentsRepository.findOne(id);
//   if (!appointment) {
//     return response
//       .status(404)
//       .json({ message: 'Não foi localizado o agendamento.' });
//   }
//   return response.json(appointment);
// });

export default appointmentsRouter;
