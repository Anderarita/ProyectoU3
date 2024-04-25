import { LogintButton } from "../Components/LoginButton";
import InitPageImage from "../Imagen/InitPage.png"
export const InitPage = () => {

    
    return (
        <div className="flex flex-row items-center justify-center min-h-screen bg-gray-800">
            <div className="bg-blue-800 rounded-lg shadow p-6 max-w-lg mx-auto flex flex-row">
                <div className="mt-4">
                    <p className="text-sm text-white justify-center uppercase p-20 ">
                        Mantente siempre conectado con nosotros.
                    </p>
                    <p>
                        <LogintButton />
                    </p>

                </div>
                <div className="flex flex-row justify-around"> {/* Centro la imagen dentro del div */}
                    <img src={InitPageImage} alt="Descripción de la imagen" className="rounded-full h-64 w-64 mb-4 " /> {/* Ejemplo de imagen redonda */}
                </div>
            </div>
        </div>
    );
};

/*const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://api.example.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response data
            console.log(data);
            // Redirect to '/redsocial'
            navigate('/redsocial');
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });
    
}*/

