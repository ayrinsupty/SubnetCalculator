 //CALCULATE FIXED LENGTH SUBNET MASKING
 function ValidateIPaddress() 
{
  var x = document.getElementById("input_network").value;
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(x))
  {
    document.getElementById("validip").innerHTML = "";
  }
  else
  {
    document.getElementById("validip").innerHTML = "<span style='color:red;'> You have entered an Invalid IP Address! </span>";
    return (false)
  }
}

function ValidateSubnet() 
{
  var x = document.getElementById("SubNum").value;
  if (x>0)
  {
    document.getElementById("validsub").innerHTML = "";
  }
  else
  {
    document.getElementById("validsub").innerHTML = "<span style='color:red;'>You have entered an Invalid Subnet Number! </span>";
    return (false)
  }
}
 
 function calculate()
 {
    var str = document.getElementById('input_network').value;
    var ss = document.getElementById('subNum').value;
    var ip = str.split('.');

    for (var i = 0; i < ip.length; i++) 
    {
      ip[i] = parseInt(ip[i]);
    }
    
    var temp = ip[0];
    var mask="";
    if (temp < 128) 
    {
      mask = 8;
    } 
    else if (temp < 192) 
    {
      mask = 16;
    } else if (temp < 224) 
    {
      mask = 24;
    } 
    else { 
      
    }
      
    var rem = 32 - mask;
    var incr1 = 0;
    var incr = Math.round(Math.pow(2,rem))/ss;
    var incr2 = incr;
    var t1 = 0;

    var j;

    var table ="<table id='printTable' class='table'><tr><th scope='col'>No.</th><th scope='col'>Network Address</th><th scope='col'>IP Range</th><th scope='col'>Broadcast Address</th></tr><tbody>";
    for (var j = 0; j < ss; j++) {
    {
      t1 = incr2;          
            table += "<tr><td scope = 'row'>" + (j + 1) + "</td>";
            table += "<td scope ='row'>" + ((ip[0]) + ("." + (parseInt(ip[1]) + parseInt(incr1 / (256 * 256))) % 256) + ("." + (parseInt(ip[2]) + parseInt(incr1 / 256) % 256)) + ("." + (parseInt(ip[3]) + parseInt(incr1 % 256)))) + "</td>";
            table += "<td scope ='row'>" + ((ip[0]) + ("." + (parseInt(ip[1]) + parseInt(incr1 / (256 * 256))) % 256) + ("." + (parseInt(ip[2]) + parseInt(incr1 / 256) % 256)) + ("." + (parseInt(ip[3]) + parseInt(incr1 % 256) +1)))
            + '   ' + ' - ' + '   ' +
            ((ip[0]) + ("." + (parseInt(ip[1]) + parseInt(((t1 / (256 * 256)) - 1)) % 256)) + ("." + (parseInt(ip[2]) + parseInt((t1 / 256) - 1) % 256)) + ("." + (parseInt(ip[3]) + parseInt((t1 - 1) % 256) - 1))) + "</td>";
            table += "<td scope ='row'>" + ((ip[0]) + ("." + (parseInt(ip[1]) + parseInt(((t1 / (256 * 256)) - 1)) % 256)) + ("." + (parseInt(ip[2]) + parseInt((t1 / 256) - 1) % 256)) + ("." + (parseInt(ip[3]) + parseInt((t1 - 1) % 256)))) + "</td></tr>";
      
            incr1 = incr2;
            incr2 = incr1 + incr; 
    };

    tableend = "</tbody></table>";
    document.getElementById("demo").innerHTML = table + tableend;
    }     
         
  };
  