import { Data } from "./Rates"

const Validations = (data:Data, eventName:string) => {
    let res = {
        name: '',
        disabled1: true,
        mail: '',
        disabled2: true,
        phone: '',
        disabled3: true,
    }

    if (eventName === 'name') {
        if (data.name.length === 0) {
            res.name = 'El nombre no puede estar vacio'
        }
        else {
            res.name = ''
            res.disabled1 = false
        }
        return res
    }

    if (eventName === 'mail') {
        if (!/\S+@\S+\.\S+/.test(data.mail)) {
            res.mail = 'ingrese un mail válido'
        }
        else {
            res.mail = ''
            res.disabled2 = false
        }
        return res
    }
    if (eventName === 'phone') {
        if (!/^\d+$/.test(data.phone)) {
            res.phone = 'Ingrese solo números'
        }
        else {
            res.phone = ''
            res.disabled3 = false
        }
        return res
    }

}


export default Validations