import { inject, injectable } from "tsyringe/dist/typings/decorators";

import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppErros";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlradyExists =
            await this.specificationsRepository.findByName(name);

        if (specificationAlradyExists) {
            throw new AppError("Specification already exists!");
        }

        await this.specificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
