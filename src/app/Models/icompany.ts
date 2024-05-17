export interface Icompany {
    address:{
        city:string;
        area:string;
    }
    description:string;
    email:string;
    industry:string;
    logo:any;
    name:string;
    numOfEmployees:{
        maxRange:number;
        minRange:number;
    }
    website:string;
}
