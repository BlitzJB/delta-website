import { NextApiRequest, NextApiResponse } from "next";
import { Post } from "./getPosts";
import { kv } from "@vercel/kv";
import { v4 as uuidv4 } from 'uuid';

export default async function getProducts(req: NextApiRequest, res: NextApiResponse) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS'); 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    const apiKey = req.headers.authorization?.split(' ')[1];;
    const post = req.body as Post;
    post.id = uuidv4();

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
        await kv.set(`${apiKey}:posts`, [post]);
        res.status(200).json([post]);
        return;
    }

    const newPosts = [
        ...posts,
        post
    ];

    await kv.set(`${apiKey}:posts`, newPosts);

    res.status(200).json(newPosts);
}