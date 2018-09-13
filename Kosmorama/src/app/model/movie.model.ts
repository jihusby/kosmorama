export class Movie {

    constructor(
        public id: number,
        public title: string, 
        public desc: string, 
        public imagePath: string,
        public startTime: Date, 
        public duration: number,
        public category: string,
        public room: string,
        public registered: boolean) {}
    
}
