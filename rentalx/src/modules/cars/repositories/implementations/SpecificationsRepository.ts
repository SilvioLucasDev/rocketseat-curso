import { Specification } from "../../model/Specification";
import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    private specificantions: Specification[];

    constructor() {
        this.specificantions = [];
    }

    create({ name, description }: ICreateSpecificationDTO): void {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        });

        this.specificantions.push(specification);
    }

    findByName(name: string): Specification {
        const specification = this.specificantions.find(
            (specification) => specification.name === name
        );

        return specification;
    }
}

export { SpecificationsRepository };
