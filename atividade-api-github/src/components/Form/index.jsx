import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import "./style.css"
const Form = () =>{
    const [aswerApi, setAswerApi] = useState([])
    const [erroApi, setErroApi] = useState('')
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
            const filtered = aswerApi.filter((elemento)=>elemento.id === response.id )
            if(filtered.length === 0){
                setAswerApi([...aswerApi, response])
            }if(response.ok){
                console.log("a")
            }
          })
          console.log(aswerApi)
    }
    useEffect(()=>{
        if(aswerApi){
            console.log(aswerApi)
           
        }
    }, [aswerApi])
    return(
        <>  
            <form onSubmit={handleSubmit(handleClick)}>
                <h1>API - Github</h1>
                <input type='text' placeholder="Nome do usuario e o rep" {...register("rep")} />
                <button type='submit'>Pesquisar</button>
                {errors.rep && <p>{errors.rep.message}</p>}
                {aswerApi && aswerApi.message && <p>Repositório não encontrado</p>}

            </form>
            {aswerApi && !aswerApi.message &&
                aswerApi.map((resp)=>(
                    <div key={resp.id} className="gitinfo-container" >
                        <img src={resp.owner.avatar_url} alt={resp.name}/>
                        <section>
                            <div>
                                <p><strong>Nome</strong></p>
                                <p>{resp.name}</p>
                            </div>
                            {resp.description ?(
                                <div className='second'>
                                    <p><strong>Descrição</strong></p>
                                    <p>{resp.description}</p>
                                </div>
                        ):(
                            <div className='second'>
                                <p><strong>Descrição</strong></p>
                                <p>O repositório <strong>não possui descrição</strong></p>
                            </div>
                            
                        )}
                        </section>
                    </div>
                ))
            }
        </>
    )
}
export default Form