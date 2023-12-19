import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './filme-info.css';


function Filme(){

    const {id} = useParams();
    const [detalheFilme, setdetalheFilme] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "c3a18f49320426cb1038f192afaf242c",
                    language: "pt-BR"
                }
            })
            .then((response)=>{

                setdetalheFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                navigate('/', {replace:true});
                return;
            })

        }

        loadFilme();

        return ()=>{
            console.log('COMPONENTE FOI DESMONTADO')
        }
    },[navigate, id])

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className='filme-info'>
            <h1>{ detalheFilme.title }</h1>
            <img src={`https://image.tmdb.org/t/p/original/${detalheFilme.backdrop_path}`} alt={detalheFilme.title} />

            <h3>Sinopse</h3>
            <span>{ detalheFilme.overview }</span>
            <strong>Avaliação: {detalheFilme.vote_average.toFixed(1)} / 10</strong>

            <div className='area-buttons'>
                <button>Salvar</button>
                <button>
                    <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${detalheFilme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;