import style from './Property.module.css'
import pesos from '../../img/pesos.png'
import dolares from '../../img/dolares.png'
import bedroomsIcon from '../../img/bedroom.png'
import bathroomsIcon from '../../img/bathroom.png'
import sizeIcon from '../../img/size.png'
import venta from '../../img/Venta.png'
import alquiler from '../../img/Alquiler.png'
import { useNavigate } from 'react-router-dom'

const Property = ({id, price, currency, bedrooms, bathrooms, name, location, images, type, size, category }) => {

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