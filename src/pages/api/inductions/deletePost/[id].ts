import { NextApiRequest, NextApiResponse } from "next";
import { Post } from "../getPosts";
import { kv } from "@vercel/kv";

export default async function getProducts(req: NextApiRequest, res: NextApiResponse) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS'); 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    const apiKey = req.headers.authorization?.split(' ')[1];;
    const { id } = req.query;

    if (!apiKey) {
        res.status(401).json({ error: 'unauthorized' });
        return;
    }

    const apiKeys = (await kv.get('apiKeys')) as string[];

    if (!apiKeys) {
        res.status(401).json({ error: 'unauthorized' });
        return;
    }

    const key = apiKeys.find((key: string) => key === apiKey);

    if (!key) {
        res.status(401).json({ error: 'unauthorized' });
        return;
    }

    const posts = (await kv.get(`${apiKey}:posts`) as Post[]);

    if (!posts) {
        res.status(404).json({ error: 'posts not found'});
        return;
    }

    const newPosts = posts.filter((post: Post) => post.id !== id);
    console.log(newPosts);

    await kv.set(`${apiKey}:posts`, newPosts);

    res.status(200).json(newPosts);

}