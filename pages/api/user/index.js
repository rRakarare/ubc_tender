import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const user = await prisma.user.aggregate({
    _count: {
      id: true,
    },
  });

  const data = [
    {
      name: "user",
      counts: user._count.id,
    },
  ];

  console.log(data)

  res.json(data);
}
