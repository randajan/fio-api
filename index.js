import sapp, { argv } from "@randajan/simple-lib";



sapp(argv.isBuild, {
    port:4002,
    mode:"node",
    external:["chalk"],
    lib:{
        minify:false,
        entries:["index.js"]
    }
})