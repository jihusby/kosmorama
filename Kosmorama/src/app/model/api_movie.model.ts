export class ApiMovie {

    constructor(
        public movie_id: number,
        public title: string, 
        public desc: string, 
        public imagePath: string,
        public duration: number,
        public category_id: number) {}
    
}
