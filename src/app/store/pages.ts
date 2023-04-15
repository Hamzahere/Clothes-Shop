export interface State {

    CartItem :{
        price:number;
        name:string;
        quantity:number;
    },
    NewArrival:{
        id:number;
        image:string;
        name:string;
        price:number;
        sale:boolean;

    },
    singleProduct:{
        id:number;
        name:string;
        description:string;
        price:number;
        image:string;
    },
    success:boolean,
    productAddedtoCart:boolean
}

export interface CartItem {
        price:number;
        name:string;
        quantity:number;
        imageUrl:string;
    
}

