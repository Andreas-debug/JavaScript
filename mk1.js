function imageData(image) 
{
    //document.write(image.src);
    var canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    return context

}

function getPixel(context, x, y){
    const ata = context.getImageData(x, y, 1, 1).data;
    document.getElementById("asciiArt").innerHTML+=ata;
    //document.write(ata + 'RGB' + '\n\n\n');
    return ata; 

}
function readURL(input){
    var inp = new Image(input.files[0].width, input.files[0].height);
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function (e) {
            $('#blah')
                .attr('src', e.target.result)
                .width(input.files[0].width)
                .height(input.files[0].height);
            inp.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
    var imagedata = imageData(inp);
    for(var y = 0; y < inp.height; y++)
    {
        for(var x = 0; x < inp.width; x++)
        {
            var color = getPixel(imagedata, x, y);
            var brightness = ((color[0] + color[1] + color[2])/3)*(color[3]/255);
            document.write(color);
        }
    }
}