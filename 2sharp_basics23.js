const sharp = require('sharp');
const fs = require('fs');

/************************************************************************/
const getMetadata23 = async (path23) => {
    const metadata = await sharp(path23).metadata();
    return metadata;
} 
let path1 = 'resources_images/dhoni.jpg';

// getMetadata23(path1).then(res => {
//     console.log("metadata23 ===> ", res);
// }).catch(err => {
//     console.log("err23 ===> ", err);
// });

/************************************************************************/

async function resizeImage(path23, opPath) {
    await sharp(path23)
        .resize({ width: 200, height: 150})
        .toFile(opPath);
}
resizeImage(path1, `resources_images/resized23.jpeg`);
  

async function multipleActions(path23, opPath) {
    sharp(path23)
        .rotate()
        .resize(200)                // both width & height will be 200
        .toFormat('png')                 // convert to "png" format
        .toBuffer((err, data) => {
            fs.writeFile(opPath, data, "binary", function(err) {
                if(err) { console.log("ekkado tannindi"); }
                else { 
                    console.log("saved file23"); 
                    // file resources_images/kohli_resized_in_png.png       ---> verify file_format
                }
            })
        });
}
multipleActions("resources_images/kohli.jpeg", "resources_images/kohli_resized_in_png.png")