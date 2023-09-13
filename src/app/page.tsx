export default async function Home() {

  return (<>
  <div className="bg-neutral-900 text-neutral-300 md:p-40 py-24 px-12 h-screen overflow-hidden">
    <div className="flex items-center ">
      <img src="favicon.svg" alt="" className="h-12" />
      <div className="text-2xl ml-2 font-bold">
        Delta
      </div>
    </div>
    <div className="w-full h-screen flex mt-12">
      <a href="/redirect/public" className="px-4 py-6 bg-neutral-800 rounded-md w-fit h-fit font-medium cursor-pointer hover:bg-neutral-300 hover:text-black transition-all duration-200 hover:shadow-2xl hover:shadow-neutral-700">
        Public Whatsapp -&gt;
      </a>
    </div>
  </div>
  </>);
}

