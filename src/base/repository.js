export default class Repository {
  gateway

  constructor(gateway) {
    this.gateway = gateway
  }

  async read(options = {}) {
    const { id } = options
    if (!id) return await this.gateway.findAll();
    return await this.gateway.findById(id);
  }

  async save(payload) {
    const { id, ...data } = payload;
    if (!id) return await this.gateway.insert(data);
    return await this.gateway.update(id, data);
  }

}
