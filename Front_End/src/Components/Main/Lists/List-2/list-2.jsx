class ListData2 {
    constructor(t, n, i) {
        this.t = t;
        this.n = n;
        this.i = i;
    }
}

const prototypeData1 = new ListData2 ("Hotels", 122, "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=")
const prototypeData2 = new ListData2 ("Apartments", 222, "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg")
const prototypeData3 = new ListData2 ("Resorts", 55, "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg")
const prototypeData4 = new ListData2 ("Vilas", 40, "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg")
const prototypeData5 = new ListData2 ("Capins", 130, "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg")

export const secondList = [
    prototypeData1,
    prototypeData2,
    prototypeData3,
    prototypeData4,
    prototypeData5
]