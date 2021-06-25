//import qexrt from "../out/svgTestGrigorev.qext"

export default {
     type: "items", 
     component: "accordion",
     items: {
         dimensions: {
             uses: "dimensions",
             min: 0,
             max: 2
         },
         measures: {
            uses: "measures",
            min: 0,
            max: 2
        },
         settings: {
             uses: "settings"
         }
     }
 }