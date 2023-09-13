import { kv } from '@vercel/kv'

export default async function Home() {
    
    return (<>
        <div className="bg-neutral-900 text-neutral-300 md:p-40 py-16 px-8 h-screen overflow-hidden">
            <div className="flex items-center ">
                <img src="favicon.svg" alt="" className="h-12" />
                <div className="text-2xl ml-2 font-bold">
                    Delta
                </div>
            </div>
            <div className="w-full flex flex-col mt-12">
                <div className='text-neutral-700 font-bold text-lg mb-4'>Join Our Whatsapp</div>
                <a href="/redirect/public" className="px-4 py-6 bg-neutral-800 rounded-md md:w-fit h-fit font-medium cursor-pointer hover:bg-neutral-300 hover:text-black transition-all duration-200 hover:shadow-2xl hover:shadow-neutral-700 flex items-center">
                    <div>
                        Public Whatsapp
                    </div>
                    <div className='ml-auto md:ml-2 font-bold'>
                        -&gt;
                    </div>
                </a>
            </div>
            <div>
                <div className='text-neutral-700 font-bold text-lg mt-10'>Contact Delta Core</div>
                <DeltaCoreShowcase />
            </div>
        </div>
    </>);
}

const DeltaCoreShowcase = async () => {
    let deltaCoreMembers = await kv.get('cms:delta-core-members') as DeltaCoreMember[]

    return <>
        <div className='flex md:-ml-4 flex-col md:flex-row pb-20'>
            {
                deltaCoreMembers.map(member => <DeltaCoreMember {...member} />)
            }
        </div>
    </>
}   

interface DeltaCoreMember {
    name: string
    icon: string
    vertical: string
    phone: string
}

const DeltaCoreMember = ({ name, icon, vertical, phone }: DeltaCoreMember) => {
    return <a href={`https://wa.me/${phone}?text=Hey!%20I'm%20Reaching%20out%20to%20you%20regarding%20Delta`} className='h-20 md:w-20 w-full md:hover:w-fit flex md:overflow-hidden items-center md:hover:bg-neutral-800 md:bg-transparent bg-neutral-800 transition-all duration-300 p-4 cursor-pointer rounded-md md:mt-0 mt-2'>
        <div style={{ minWidth: '3rem' }} className='h-12 w-12 aspect-square flex items-center justify-center rounded-full bg-neutral-800'>
            { icon }
        </div>
        <div className='ml-4'>
            <div className='font-medium text-sm md:text-base'>{ name }</div>
            <div className='font-bold text-neutral-700 text-xs md:text-base'>{ vertical }</div>
        </div>
        <div className='ml-auto'>
            <img className='h-6 ml-5' src="openwhatsapp.svg" alt="" />
        </div>
    </a>
}

