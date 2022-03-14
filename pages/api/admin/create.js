import prisma from "../../../lib/prisma";
const bcrypt = require("bcrypt");


export default async function handle(req, res) {
  const model = req.body.model.toLowerCase();
  const body = req.body.data;

  let data = null

  if (model === "user") {
    const newBody = {...body, password: bcrypt.hashSync(body.password, 10)} 
    data = await prisma[model].create({ data: newBody });
  } else {
    data = await prisma[model].create({ data: body });
  }

  

  res.json(data);
}