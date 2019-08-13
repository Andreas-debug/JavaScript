function getImageData(image) 
{
    var canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    return context

}

function getPixel( context, x, y ) {

    let imageData = getPixel(context, x, y).data;
    return imageData; 

}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function (e) {
            $('#blah')
                .attr('src', e.target.result)
                .width(input.files[0].width)
                .height(input.files[0].height);
        };

        reader.readAsDataURL(input.files[0]);
    }

    var inp = new Image(document.getElementById("blah").width, document.getElementById("blah").height);
    inp.src = document.getElementById("blah").src;

    var imagedata = getImageData(inp);
    for(var y = 0; y < inp.height; y++)
    {
        for(var x = 0; x < inp.width; x++)
        {
            var color = getPixel( imagedata, x, y );
            var brightness = ((color[0] + color[1] + color[2])/3)*(color[3]/255);
            document.write(color);
        }
    }
}