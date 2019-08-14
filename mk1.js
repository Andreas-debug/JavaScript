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
var input

function preview(inpu){
    input = inpu
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
    
    return (inp)
}

function readURL(){
    var inp = preview(document.getElementById("FILE"))
    //var characters = ("$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft" + "/|" + "()1{}[]?-_+~<>i!lI;:," + '"^`' + "\\" + ".'" + "'\xa0");
    var characters = ("$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft" + "/|" + "()1{}[]?-_+~c>i!lI;:," + '"^`' + "\\" + ".'" + "\xa0\xa0");

    inp.onload = function() {  
        try
        {
            var pixelsPerDatapoint = parseFloat (document.getElementById("PPDP").value);
            var outputFontSize = parseFloat(document.getElementById ("OFS").value);
        }
        catch
        {
            document.getElementById("asciiArt").innerHTML = "Not a  number"
        }
        document.getElementById("asciiArt").innerHTML="";
        var all = [];
        var selected = document.getElementById("selection").options[document.getElementById("selection").selectedIndex].value;
        var pixels = [];
        var imagedata = imageData(inp);
        for(var y = 0; y < inp.height; y += (inp.height * pixelsPerDatapoint) / inp.height)
        {
            pixels = [];
            for(var x = 0; x < inp.width; x += (inp.width * pixelsPerDatapoint) / inp.width)
            {
                var color = getPixel(imagedata, Math.round(x), Math.round(y));
                var brightness = ((color[0] + color[1] + color[2])/ 3)*(color[3]/255);
                brightness = Math.round(brightness);
                pixels.push(brightness);
            }
            all.push(pixels);
        }
        var endString = String();
        for(var a = 0; a < all.length; a++){
            endString = "";
            for(var i = 0; i < all[a].length; i++)
            {
                brightness = all[a][i];
                str = String(characters.charAt(Math.floor(brightness/(255/(characters.length-1)))));
                if (selected == 0)
                {
                    endString += str;
                }
                else if (selected == 1)
                {
                    endString += str + "\xa0";
                }
                else
                {
                    endString += str + str;
                }
            }
            endString += '<br>';
            document.getElementById("asciiArt").style.fontSize = String(outputFontSize) + "px";
            document.getElementById("asciiArt").innerHTML+=String(endString);
        }
        alert("Text Done Generating");
    };
}