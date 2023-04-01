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

    }
}

export interface CartItem {
        price:number;
        name:string;
        quantity:number;
        imageUrl:string;
    
}

