import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const model = req.body.model.toLowerCase();
  const body = req.body.data;


  const data = await prisma[model].delete({
    where: body,
  });

  res.json(data);
}
