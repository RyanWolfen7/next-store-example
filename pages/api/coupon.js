// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if ( req.body.code == 'code' ) {
    res.status(200).json({id: '123456', code: 'code'})
  } else {
    res.status(404).json({error: 'does not exist'})
  }
}
