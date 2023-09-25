import { NextApiRequest, NextApiResponse } from "next";
import { kv } from "@vercel/kv";

export interface Post {
    id: string;
    title: string;
    content: string;
    createdLat: string;
    createdLong: string;
    other: string;
}

export default async function getProducts(req: NextApiRequest, res: NextApiResponse) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS'); 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    const apiKey = req.headers.authorization?.split(' ')[1];

    if (!apiKey) {
        res.status(401).json({ error: 'unauthorized: no header' });
        return;
    }

    const apiKeys = (await kv.get('apiKeys')) as string[];
    
    if (!apiKeys) {
        res.status(401).json({ error: 'unauthorized: keys not set' });
        return;
    }
    
    const key = apiKeys.find((key: string) => key === apiKey);
    console.log(apiKey);

    if (!key) {
        res.status(401).json({ error: 'unauthorized: invalid key' });
        return;
    }

    const posts = await kv.get(`${apiKey}:posts`);

    if (!posts) {
        res.status(200).json([]);
        return;
    }

    res.status(200).json(posts);
}

// sample fetch call
// fetch('https://inductions.vercel.app/api/inductions/getPosts', {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + apiKey
//     }
// })