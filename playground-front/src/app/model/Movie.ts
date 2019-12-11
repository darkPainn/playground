import { Director } from './Director';

export class Movie{

    constructor(
        public id:number,
        public title:string,
        public directors:Director[],
        public releaseDate:Date,
        public type:string
    ){}

}