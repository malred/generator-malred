// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// http://localhost:3000/api/hello?name=ls
export default function handler(req, res) {
  const { name } = req.query
  res.status(200).json({ name })
}
