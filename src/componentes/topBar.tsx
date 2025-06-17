

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function TopBar() {

    return (
       <main className="fixed top-0 left-0 w-full z-50 h-[45px] bg-gray-900 flex justify-center">
            <div className="flex-grow" />
            <div className="text-white flex justify-center items-center  ">

                <button
                    onClick={() => {

                    }}
                    className="
                transition active:scale-95 active:bg-slate-500 
                focus:outline-none px-4 py-2 ">
                    Home
                </button>
                <button
                    onClick={() => {

                    }}
                    className="
                transition active:scale-95 active:bg-slate-500 
                focus:outline-none px-4 py-2 ">
                    Sobre
                </button>
                <button
                    onClick={() => {

                    }}
                    className="
                transition active:scale-95 active:bg-slate-500 
                focus:outline-none px-4 py-2 ">
                    App
                </button>
                <button
                    onClick={() => {

                    }}
                    className="
                transition active:scale-95 active:bg-slate-500 
                focus:outline-none px-4 py-2 ">
                    Contato
                </button>
            </div>
            <div className="flex-grow" />
            <div className='flex items-center pr-10'>

                <AccountCircleIcon fontSize="large" className='text-white' />
            </div>
        </main>
    )
}