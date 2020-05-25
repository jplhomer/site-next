import { getGlances } from '@/lib/glances';

export default async (req, res) => {
  const glances = await getGlances();

  res.json(glances);
};
