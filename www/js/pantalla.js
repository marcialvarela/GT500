/**
 * Created by mvarela on 12/06/2015.
 */

//alert('Pantalla ... Width: ' + screen.width + '  Height: ' + screen.height);

calculate_ratio();

function gcd (a, b) {
    return (b == 0) ? a : gcd (b, a%b);
}

function calculate_ratio()
{
    var w = screen.width;
    var h = screen.height;
    var r = gcd (w, h);

    //document.write ("<pre>");
    //document.write ("Dimensions = ", w, " x ", h, "<br>");
    //document.write ("Gcd        = ", r, "<br>");
    //document.write ("Aspect     = ", w/r, ":", h/r);
    //document.write ("</pre>");

    rW = w/r;
    rH = h/r;
    return (rW + ":" + rH);
}

