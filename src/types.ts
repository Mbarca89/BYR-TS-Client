import { Tracing } from "trace_events"

export interface PropertyDetailType {
    id:string,
    featured: boolean,
    name: string,
    description: string,
    type: string,
    category: string,
    price: number,
    currency: string,
    location: string,
    size: number,
    constructed: number,
    bedrooms: number,
    bathrooms: number,
    kitchen: number,
    garage: number,
    others: Array<string>,
    services: Array<string>,
    amenities: Array<string>,
    images: Images[]
}

export interface Images {
    id: string
    url: string
}

export interface PropertyType {
    id:string,
    featured: boolean,
    name: string,
    description: string,
    type: string,
    category: string,
    price: number | undefined,
    currency: string,
    location: string,
    size: number | undefined,
    constructed: number | undefined,
    bedrooms: number | undefined,
    bathrooms: number | undefined,
    kitchen: number | undefined,
    garage: number | undefined,
    others: Array<string>,
    services: Array<string>,
    amenities: Array<string>,
}

export interface CarouselItemType {
    id: string,
    image: string, 
    name: string,
    location: string
}