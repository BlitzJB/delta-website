import { redirect } from 'next/navigation'
import { kv } from '@vercel/kv'

export default async function Redirect() {
    const url = await kv.get('cms:public-whatsapp')
    if (!url) {
        return <>Ayo What? no public whatsapp key set. Contact Delta core for link</>
    }
    
    redirect(url as string)
}