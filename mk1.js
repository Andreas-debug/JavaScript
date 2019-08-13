function getImageData(image) 
{
    var canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    let imageData = context.getImageData(0, 0, image.width, image.height);
    return imageData

}

function getPixel( imagedata, x, y ) {

    var position = ( x + imagedata.width * y ) * 4, data = imagedata.data;
    return { r: data[ position ], g: data[ position + 1 ], b: data[ position + 2 ], a: data[ position + 3 ] };

}
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah')
                .attr('src', e.target.result)
                .width(150)
                .height(200);
        };

        reader.readAsDataURL(input.files[0]);
    }

    var inp = new Image();
    inp.src = document.getElementById("blah")
    
    var imagedata = getImageData(inp);
    document.write("Boi");
    for(y = 0; y < inp.height; y++)
    {
        for(x = 0; x < inp.width; x++)
        {
            var color = getPixel( imagedata, x, y );
            var brightness = ((color.r + color.g + color.b)/3)*(color.a/255);
            document.write(brightness);
        }
    }
}