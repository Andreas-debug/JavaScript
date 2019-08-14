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
    //document.getElementById("asciiArt").innerHTML+=ata;
    //document.write(ata + 'RGB' + '\n F');
    return ata; 
}

function readURL(input){
    var characters = ("$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft" + "/|" + "()1{}[]?-_+~<>i!lI;:," + '"^`' + "\\" + ".'" + "'\xa0");
    var inp = new Image();
    var file = document.querySelector('input[type=file]').files[0];
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.addEventListener("load", function () {
            inp.src = reader.result;
            document.querySelector('img').src = reader.result;
          }, false);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    inp.onload = function() {  
        var pixels = []
        var imagedata = imageData(inp);
        for(var y = 0; y < inp.height; y++)
        {
            pixels.push(240)
            for(var x = 0; x < inp.width; x++)
            {
                var color = getPixel(imagedata, x, y);
                var brightness = ((color[0] + color[1] + color[2])/ 3)*(color[3]/255);
                brightness = Math.round(brightness)
                pixels.push(brightness)
            }
            pixels.push('<br>')
        }
        var endString = String()
        for(var i = 0; i < pixels.length; i++){
            brightness = pixels[i];
            if (brightness != '<br>')
            {
                endString += String(characters.charAt(Math.round(brightness/(255/(characters.length)))));
            }
            else{
                endString += String('<br>');
            }
        }
        document.getElementById("asciiArt").innerHTML=String(endString);
    };
}