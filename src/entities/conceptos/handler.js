import { Router } from 'express'
import supabase from '../../db.js';
import ConceptoRepository from './repository.js';
import ConceptoGateway from './gateway.js';

const router = Router();
const repository = new ConceptoRepository(new ConceptoGateway());

router.get('/conceptos', async (req, res) => {
  const {data, error} = await repository.read()
  res.send({ conceptos: data });
});

router.get('/conceptos/:id', async (req, res) => {
  const {data, error} = await repository.read({ id: req.params.id })
  res.send(data);
});

router.post('/conceptos', async (req, res) => {
  const payload = req.body;
  const { data, error } = await repository.save(payload)
  if (error) {
      res.send(error);
  }
  res.send("created!!");
});

router.put('/conceptos/:id', async (req, res) => {
  const data = req.body;
  const {error} = await supabase
      .from('bbr_conceptos')
      .update(data)
      .eq('id', req.params.id)
  if (error) {
      res.send(error);
  }
  res.send("updated!!");
});

router.delete('/conceptos/:id', async (req, res) => {
  const {error} = await supabase
      .from('bbr_conceptos')
      .delete()
      .eq('id', req.params.id)
  if (error) {
      res.send(error);
  }
  res.send("deleted!!")

});

export default router
