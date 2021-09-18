import { useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { IoArrowRedo, IoCloseSharp } from "react-icons/io5";
import "./style.css"
const Form = () =>{
    const [aswerApi, setAswerApi] = useState([])
    const [erroApi, setErroApi]   = useState(null)
    const [repeated, setRepeated] = useState(null)
    const [filtered, setFiltered] =  useState(null)
    const formScheme = yup.object().shape({
        rep: yup.string().required("Campo obrigatório").min(5, 'Minimo de digitos é 5')
    })
    const {register, handleSubmit, formState:{ errors }} = useForm({
        resolver: yupResolver(formScheme)
    })
    const handleClick = (data) =>{
        fetch(`https://api.github.com/repos/${data.rep}`)
            .then((response)=>response.json())
            .then((response)=>{
                if(response.id){
                    const filtered = aswerApi.filter((elemento)=>elemento.id === response.id )
                    if(filtered.length === 0){
                    setAswerApi([...aswerApi, response])
                    setErroApi(null)
                    setRepeated(false)
                    }if(filtered.length !==0){
                        setRepeated(true)
                    }
                }else setErroApi(true)
        })
    }
    console.log(aswerApi)
    return(
        <>  
            <form onSubmit={handleSubmit(handleClick)}>
                <h1>API - Github</h1>
                <input type='text' placeholder="Nome do usuario e o rep" {...register("rep")} />
                <button type='submit'>Pesquisar</button>
                {errors.rep && <p>{errors.rep.message}</p>}
                {erroApi && <p>Repositório não encontrado</p>}
                {repeated && <p>Não pode adicionar o mesmo repositório</p>}
            </form>
            {aswerApi && 
                aswerApi.map((resp)=>(
                    <div key={resp.id} className="gitinfo-container">
                        <img src={resp.owner.avatar_url} alt={resp.name} href='google.com'/>
                        <section>
                            <div>
                                <p><strong>Nome</strong></p>
                                <p>{resp.name}</p>
                            </div>
                            {resp.description ?(
                                <>
                                    <div className='second'>
                                        <p><strong>Descrição</strong></p>
                                        <p>{resp.description}</p>
                                    </div>
                                    <a href={resp.clone_url} target="_blank" alt='Ir para o repositório' rel='noreferrer'><IoArrowRedo/></a>
                                    <IoCloseSharp/>
                                </>
                        ):(
                            <>
                            <div className='second'>
                                <p><strong>Descrição</strong></p>
                                <p>O repositório <strong>não possui descrição</strong></p>
                            </div>
                            <a href={resp.clone_url} target="_blank" alt='Ir para o repositório' rel='noreferrer'><IoArrowRedo/></a>
                            <IoCloseSharp/> 
                            </>
                            
                        )}
                        </section>
                    </div>
                ))
            }
        </>
    )
}
export default Form