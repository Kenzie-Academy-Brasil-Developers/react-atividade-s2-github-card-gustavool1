import { IoArrowRedo, IoCloseSharp } from "react-icons/io5";
import { motion } from 'framer-motion'
const Card = ({ rep,handleDeleteClick }) =>{
    return(
        <motion.div 
        initial={{ x:-300}}
        animate={{ x:0, duration:0.1 }}
        key={rep.id} className="gitinfo-container">
            <img src={rep.owner.avatar_url} alt={rep.name} href='google.com'/>
            <section>
                <div>
                    <p><strong>Nome</strong></p>
                    <p>{rep.name}</p>
                </div>
                {rep.description ?(
                    <>
                        <div className='second'>
                            <p><strong>Descrição</strong></p>
                            <p>{rep.description}</p>
                        </div>
                        <div className='icons-container'>
                            <a href={rep.clone_url} target="_blank" alt='Ir para o repositório' rel='noreferrer'><IoArrowRedo/></a>
                            <IoCloseSharp onClick={()=>handleDeleteClick (rep.id)}/>
                        </div>
                    </>
            ):(
                <>
                    <div className='second'>
                        <p><strong>Descrição</strong></p>
                        <p>O repositório <strong>não possui descrição</strong></p>
                    </div>
                    <div className='icons-container'>
                        <a href={rep.clone_url} target="_blank" alt='Ir para o repositório' rel='noreferrer'><IoArrowRedo/></a>
                        <IoCloseSharp onClick={()=>handleDeleteClick (rep.id)}/>
                    </div>
                </>
                
            )}
            </section>
        </motion.div> 
    )
}
export default Card