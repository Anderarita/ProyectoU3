import{IoLogOutOutline} from 'react-icons/io5';
import { useNavigate } from 'react-router-dom'
export const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogOut = () =>{
        console.log('Click en salir2')
        navigate( "/init",  { replace: true });
    }
    return (
    <div className="relative">
        <button type='button' onClick={handleLogOut} className='z-20 text-white flex space-x-4 items-center shrink-0 grow-0 justify-between
                bottom-0  rounded-xl'>
            <div className=' rounded-md  items-center
            hover:bg-teal-700 transition-colors flex'>
                <IoLogOutOutline  className='w-4 h-4 xl:w-6 xl:h-6 '/>
                salir
            </div>  
        </button>
    </div>
  )
}