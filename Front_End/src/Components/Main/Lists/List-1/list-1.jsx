class ListData {
    constructor(t, n, i) {
        this.t = t;
        this.n = n;
        this.i = i;
    }
}

const cData1 = new ListData("Dublin", 123, "https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=");
const cData2 = new ListData("Reno", 533, "https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o=");
const cData3 = new ListData("Austin", 532, "https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o=");

export const firstList = [cData1, cData2, cData3];
