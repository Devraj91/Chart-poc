export interface Frequency {
  x: string;
  y: number;
}

export interface Data {
    series: Array<Frequency>;
    name: string;
 }

export const STATISTICS: Frequency[] = [
  {x: "A", y: .08167},
  {x: "B", y: .01492},
  {x: "C", y: .02782},
  {x: "D", y: .04253},
  {x: "E", y: .12702},
  {x: "F", y: .02288},
  {x: "G", y: .02015},
  {x: "H", y: .06094},
  {x: "I", y: .06966},
  {x: "J", y: .22153},
  {x: "K", y: .00772},
  {x: "L", y: .04025},
  {x: "M", y: .02406},
  {x: "N", y: .06749},
  {x: "O", y: .07507},
  {x: "P", y: .01929},
  {x: "Q", y: .00095},
  {x: "R", y: .05987},
  {x: "S", y: .06327},
  {x: "T", y: .09056},
  {x: "U", y: .02758},
  {x: "V", y: .00978},
  {x: "W", y: .02360},
  {x: "X", y: .00150},
  {x: "Y", y: .01974},
  {x: "Z", y: .00074}
];


export const STATS: Data[] = [
    { series: [{x: "A", y: .08167},
               {x: "B", y: .01492}, ], name: 'series-1'},
    { series: [{x: "c", y: .12702},
               {x: "F", y: .02288},
               {x: "G", y: .02015},
               {x: "H", y: .06094},
               {x: "I", y: .06966}, ], name: 'series-2'},
    { series: [{x: "Y", y: .01974},
               {x: "Z", y: .00074} ], name: 'series-3'}

] ;
