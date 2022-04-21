import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const data = { ...req.body, clientId: req.body.client.value };
  delete data.client;

  console.log(data);

  const response = await prisma.project.update({
    where: {
      id: data.id,
    },
    data: data,
    include: {
        client: true
    }
  });

  res.json(response);
}
