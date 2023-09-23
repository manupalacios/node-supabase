import supabase from '../db.js';

export default class Gateway {
  static tablename = ''

  async findAll() {
    const { data, error } = await supabase
      .from(this.tablename)
      .select();

    return { data, error };
  }

  async findById(id) {
    const { data, error } = await supabase
      .from(this.tablename)
      .select()
      .eq('id', id)

    return { data, error }
  }

  async create(payload) {
    const { data, error } = await supabase
      .from(this.tablename)
      .insert(payload);

    return { data, error }
  }



  get tablename() {
    return this.constructor.tablename
  }

}
