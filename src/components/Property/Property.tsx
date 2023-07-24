import style from './Property.module.css'
import pesos from '../../img/pesos.webp'
import dolares from '../../img/dolares.webp'
import bedroomsIcon from '../../img/bedroom.webp'
import bathroomsIcon from '../../img/bathroom.webp'
import sizeIcon from '../../img/size.webp'
import venta from '../../img/Venta.webp'
import alquiler from '../../img/Alquiler.webp'
import { useNavigate } from 'react-router-dom'

interface Props {
    id: string,
    price: number,
    currency: string,
    bedrooms: number,
    bathrooms: number,
    name: string,
    location: string,
    images: any[],
    type:string,
    size: number,
    category: string;
}

const Property = ({id, price, currency, bedrooms, bathrooms, name, location, images, type, size, category }:Props) => {

    let type1 = false
    let type2 = false
    let type3 = false

    if (type === 'Casa' || type === 'Departamento' || type === 'Cabaña' || type === 'Duplex' || type === 'Monoambiente') type1 = true
    if (type === 'Loteo' || type === 'Lote' || type === 'Campo' || type === 'Terreno') type2 = true
    if (type === 'Local' || type === 'Deposito' || type === 'Galpon' || type === 'Oficina') type3 = true

    const navigate = useNavigate()
    
    const goToDetail = () => {
        navigate(`/detail/${id}`)
    }

    return (
        <div className={style.property}>
      
            <div className={style.container} onClick={goToDetail}>
                <img className={style.photo} src={images[0].url} alt="" />
                {category === 'Venta' && <img className={style.categoryImg} src={venta} alt="" />}
                {category === 'Alquiler' && <img className={style.categoryImg} src={alquiler} alt="" />}
                <div className={style.infoContainer}>
                    <h3>{name}</h3>
                    <h3>{location}</h3>
                    <div className={style.info}>
                        <div>
                            {currency === '$' && <img src={pesos} alt="" />}
                            {currency === 'US$' && <img src={dolares} alt="" />}
                            <p>{price}</p>
                        </div>
                        {type1 && <div>
                            <img src={bedroomsIcon} alt="" />
                            <p>{`${bedrooms} Hab.`}</p>
                        </div>}
                        {type1 && <div>
                            <img src={bathroomsIcon} alt="" />
                            <p>{`${bathrooms} Bñ.`}</p>
                        </div>}
                        {type2 && <div>
                            <img src={sizeIcon} alt="" />
                            <p>{`${size} Mts`}</p>
                        </div>}
                        
                        {type3 && <div>
                            <img src={sizeIcon} alt="" />
                            <p>{`${size} Mts`}</p>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Property