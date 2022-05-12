//DEVICE IP ADDRESS LOOKUP
function networkaddress()
{
    var str = document.getElementById('ipaddressget').value;
    var ip = str.split('.');
    for (var i = 0; i < ip.length; i++) 
    {
      ip[i] = parseInt(ip[i]);
    }

    var res = ip[0];
    var getnewcls = "";
    var netad = "";     
    var fnetad = "";
    var networkadd = "";

    if(res >= 0 && res <= 127) 
    {
      getnewcls = "A";
      networkadd = "255.0.0.0";  
      netad = ip[0];
      fnetad = netad + '.0.0.0';
    }
    else if (res >= 128 && res <= 191) 
    {
      getnewcls = "B";
      networkadd = "255.255.0.0";
      netad = ip[0];
      var netad1 = ip[1];
      fnetad = netad + "." + netad1 + '.0.0';
    }
    else if (res >= 192 && res <= 223) 
    {
      getnewcls = "C";
      networkadd = "255.255.255.0";
      netad = ip[0];
      var netad1 = ip[1];
      var netad2 = ip[2];
      fnetad = netad + "." + netad1 + "." + netad2 + '.0';  
    }
    else if (res >= 224 && res <= 239) 
    {
      getnewcls = "D (Multicast Address)";
    }
    else if (res >= 240 && res <= 255) 
    {
      getnewcls = "E (Experimental)";
    }
    else 
    {
      getnewcls = "Out of range";
    }

    document.getElementById('network').innerHTML = fnetad;
    document.getElementById('classip').innerHTML = networkadd;
    document.getElementById('resClass').innerHTML = getnewcls;
}