import { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await kv.set('apiKeys', [
        '3190b5699b3f01b17e0a3cec7ddd5876', // surya
        'd53cfc3600247a6160f67463dad838a9', // Prajesh
        'c6cd0b9b27571d061752536655623d78', // vidhu
        'f212be770e766649ee4521f2b7299eb6', // vijayan
        '03df767b5176ab385eddf65c89e41f70', // keshav
        'hahatestinglmao' // internal testing
    ])
    res.status(200).json({ ok: "fun haha" })
}
