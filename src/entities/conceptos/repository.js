import Repository from "../../base/repository.js";
import ConceptoGateway from "./gateway.js";

export default class ConceptoRepository extends Repository {
  constructor() {
    const gateway = new ConceptoGateway() ;

    super(gateway)
  }
}
