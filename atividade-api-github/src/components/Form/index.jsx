import { useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import Card from "./Card"
import "./style.css"
const Form = () =>{
    const [aswerApi, setAswerApi] = useState([])
    const [erroApi, setErroApi]   = useState(null)
    const [repeated, setRepeated] = useState(null)
    const [show, setShow]         = useState(null)
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
                    setShow(false)
                    }if(filtered.length !==0){
                        setRepeated(true)
                    }
                }else setErroApi(true)
        })
    }
    const handleDeleteClick = (id) =>{
        const apagado = aswerApi.filter((elemento)=> elemento.id !== id)
        setAswerApi(apagado)
    }
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
            {!show && 
                aswerApi.map((resp)=>(
                    <Card rep={resp} key={resp.id} setFiltered={setFiltered} handleDeleteClick={handleDeleteClick}/>
                ))
            }
            
        </>
    )
}
export default Form