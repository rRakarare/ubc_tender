import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const model = req.body.model.toLowerCase();
  const body = req.body.data;

  const data = await prisma.user.create({ data: body });

  res.json(data);
}
