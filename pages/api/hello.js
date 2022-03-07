import prisma from "../../lib/prisma"

export default async function handler(req, res) {

  const data = await prisma.user.findMany();

  res.status(200).json(data)
}
