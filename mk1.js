function changeFont()
{
    var outputFontSize = parseFloat(document.getElementById ("OFS").value);
    document.getElementById("asciiArt").style.fontSize = String(outputFontSize) + "px";
}

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

pText = "Warning! 1 second can only load 35000 pixels, so don't go overkill!<br>"

function onC(){
    try
        {
            var pixelsPerDatapoint = parseFloat (document.getElementById("PPDP").value);
        }
    catch
        {
            document.getElementById("asciiArt").innerHTML = "Not a  number"
        }
    var inp = preview(document.getElementById("FILE"))
    inp.onload = function(){
        var seconds = Math.round(((inp.height*inp.width)/35000)/pixelsPerDatapoint);
        var minuites = 0;
        var hours = 0;
        var time = ""
        while(seconds >= 60){
            seconds -=60;
            minuites += 1;
            if(minuites >= 60){
                minuites -= 60;
                hours += 1;
            }
        }
        time = String(seconds) + " seconds"
        if(minuites >= 1){
            time = String(minuites) + " minuites and " + time;
        }
        if (hours >= 1){
            time = String(hours) + " hours, " + time;
        }
        document.getElementById("pTag").innerHTML = (pText + "<br>Image width: " + String(Math.round(inp.width / pixelsPerDatapoint)) + "<br>Image height: " + String(Math.round(inp.height / pixelsPerDatapoint)) + "<br>Total area: " + String(Math.round((inp.height * inp.width) / pixelsPerDatapoint)) + "<br>Average convertion time: " + String(time));
    }
}

function getPixel(context, x, y){
    const ata = context.getImageData(x, y, 1, 1).data;
    //document.getElementById("asciiArt").innerHTML+=ata;
    //document.write(ata + 'RGB' + '\n F');
    //console.log(ata);
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
    document.getElementById("barStatus").style.width = "0%";
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
            document.getElementById("barStatus").style.width = ((50 * (y + 1)) / inp.height) + "%";
            pixels = [];
            for(var x = 0; x < inp.width; x += (inp.width * pixelsPerDatapoint) / inp.width)
            {
                var color = getPixel(imagedata, Math.round(x), Math.round(y));
                var average = (color[0] + color[1] + color[2]) / 3;
                var brightness = average + (((255 - color[3]) / 255) * (255 - average));
                brightness = Math.round(brightness);
                pixels.push(brightness);
            }
            all.push(pixels);
        }
        var endString = String();
        for(var a = 0; a < all.length; a++)
        {
            document.getElementById("barStatus").style.width = ((50 * (a + 1)) / all.length) + 50 + "%";
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
                //document.getElementById("barStatus").style.width = (((a+1)*(i+1))/(all.length*all[a].length))*50 + 50 + "%";
            }
            endString += '<br>';
            document.getElementById("asciiArt").style.fontSize = String(outputFontSize) + "px";
            document.getElementById("asciiArt").innerHTML+=String(endString);

            if (a === all.length - 1) {
                alert("Text Done Generating");
            }
        }
        //alert("Text Done Generating");
    };
}