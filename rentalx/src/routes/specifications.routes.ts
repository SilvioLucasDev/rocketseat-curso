import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/CreateSpecification";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (request, response) => {
    return createSpecificationController.handle(request, response);
});

// specificationsRoutes.get("/", (request, response) => {
//     const all = specificationRepository.list();

//     return response.status(200).json(all);
// });

export { specificationsRoutes };
