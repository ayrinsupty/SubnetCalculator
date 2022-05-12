//IP SUBNET CALCULATOR

function ValidateIPaddress() 
{
  var x = document.getElementById("q1").value;
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


function ValidateHost() 
{
  var x = document.getElementById("hostNum").value;
  if (x>0)
  {
    document.getElementById("validhost").innerHTML = "";
  }
  else
  {
    document.getElementById("validhost").innerHTML = "<span style='color:red;'>You have entered an Invalid Host Number</span>";
    return (false)
  }
}


function calculate()
{
  var str=document.getElementById('q1').value;
  var ip = str.split('.');
  for (var i = 0; i < ip.length; i++) 
  {
    ip[i] = parseInt(ip[i]);
  }
  var q1 = ip[0];
  var q2 = ip[1]
  var q3 = ip[2]
  var q4 = ip[3]

  var hostNum = document.getElementById('hostNum').value;
  

  //guessing netmask by number of hosts
  var hostNumDbg=0;
  for(var i=32; i>=0; i--)
  {
    if(hostNum >= Math.pow(2,i))
    {
      hostNumDbg=32-(i+1);
      break;
    }
  }
  var cidr=hostNumDbg;
  

  //validate input value
  if(
  (q1>=0 && q1<=255) &&
  (q2>=0 && q2<=255) &&
  (q3>=0 && q3<=255) &&
  (q4>=0 && q4<=255) &&
  (cidr>=0 && cidr<=32)
  )
  
  {
  //display IP address
  document.getElementById('resIP').innerHTML=q1 + "." + q2 + "." + q3 + "." + q4;
  
  //get IP Address binaries
  var ipBin={};
  ipBin[1]=String("00000000"+parseInt(q1,10).toString(2)).slice(-8);
  ipBin[2]=String("00000000"+parseInt(q2,10).toString(2)).slice(-8);
  
  ipBin[3]=String("00000000"+parseInt(q3,10).toString(2)).slice(-8);
  ipBin[4]=String("00000000"+parseInt(q4,10).toString(2)).slice(-8);
  
  //decide standard class
  var standardClass="";
  if(q1<=126) 
  {
    standardClass="A";
  }
  else if (q1==127) 
  {
    standardClass="loopback IP"
  }
  else if (q1>=128 && q1<=191) 
  {
    standardClass="B";
  }
  else if (q1>=192 && q1<=223) 
  {
    standardClass="C";
  }
  else if (q1>=224 && q1<=239) 
  {
    standardClass="D (Multicast Address)";
  }
  else if (q1>=240 && q1<=255) 
  {
    standardClass="E (Experimental)";
  }
  else 
  {
    standardClass="Out of Range";
  }
  
  //netmask
  var mask=cidr;
  var importantBlock=Math.ceil(mask/8);
  var importantBlockBinary=ipBin[importantBlock];
  var maskBinaryBlockCount=mask%8;
  if(maskBinaryBlockCount==0)importantBlock++;
  var maskBinaryBlock="";
  var maskBlock="";
  for(var i=1;i<=8;i++)
  {
    if(maskBinaryBlockCount>=i)
    {
      maskBinaryBlock+="1";
    }
    else
    {
      maskBinaryBlock+="0";
    }
  }

  //convert binary mask block to decimal
  maskBlock=parseInt(maskBinaryBlock,2);
  
  //net & broadcast addr
  var netBlockBinary="";
  var bcBlockBinary="";
  for(var i=1;i<=8;i++)
  {
    if(maskBinaryBlock.substr(i-1,1)=="1")
    {
      netBlockBinary+=importantBlockBinary.substr(i-1,1);
      bcBlockBinary+=importantBlockBinary.substr(i-1,1);
    }
    else
    {
      netBlockBinary+="0";
      bcBlockBinary+="1";
    }
  }
  
  //put everything together, create a string container variables
  var mask="";
  var maskBinary="";
  var net="";
  var bc="";
  var netBinary="";
  var bcBinary="";
  var rangeA="";
  var rangeB="";


  //loop to put whole strings block together
  for(var i=1;i<=4;i++)
  {
    if(importantBlock>i) 
    {
      //blocks before the important block.
      mask+="255";
      maskBinary+="11111111";
      netBinary+=ipBin[i];
      bcBinary+=ipBin[i];
      net+=parseInt(ipBin[i],2);
      bc+=parseInt(ipBin[i],2);
      rangeA+=parseInt(ipBin[i],2);
      rangeB+=parseInt(ipBin[i],2);
    }
    else if (importantBlock==i) 
    {
      //the important block.
      mask+=maskBlock;
      maskBinary+=maskBinaryBlock;
      netBinary+=netBlockBinary;
      bcBinary+=bcBlockBinary;
      net+=parseInt(netBlockBinary,2);
      bc+=parseInt(bcBlockBinary,2);
      rangeA+=parseInt(netBlockBinary,2);
      rangeB+=parseInt(bcBlockBinary,2);
      }
      else 
      {
        //block after the important block.
        mask+=0;
        maskBinary+="00000000";
        netBinary+="00000000";
        bcBinary+="11111111";
        net+="0";
        bc+="255";
        rangeA+=1;
        rangeB+=254;
      }
      //add . separator except the last block
      if(i<4){
        mask+=".";
        maskBinary+=".";
        netBinary+=".";
        bcBinary+=".";
        net+=".";
        bc+=".";
        rangeA+=".";
        rangeB+=".";
      }
    }
  

  //additional : count maximum host, maximum net and current subnets
  var binaryHost="";
  for(var i=(31-cidr);i>=0;i--)
  {
    binaryHost=binaryHost+"1";
  }
  var maxHost=parseInt(binaryHost,2)-1;

  var binarySubnet="";
  for(var i=(cidr-1);i>=0;i--)
  {
    binarySubnet=binarySubnet+"1";
  }
  var maxSubnet=parseInt(binarySubnet,2)+1;

  var binaryCurrentSubnetBlock="";
  for(var i=maskBinaryBlockCount-1;i>=0;i--)
  {
    binaryCurrentSubnetBlock=binaryCurrentSubnetBlock+"1";
  }
  var maxCurrentSubnetBlock=parseInt(binaryCurrentSubnetBlock,2)+1;
  

  //write the results to the page.
  document.getElementById('resMask').innerHTML=mask;
  document.getElementById('resNet').innerHTML=net;
  document.getElementById('resBC').innerHTML=bc;
  document.getElementById('resRange').innerHTML=rangeA + " - " + rangeB;
  document.getElementById('resBinIP').innerHTML=ipBin[1]+"."+ipBin[2]+"."+ipBin[3]+"."+ipBin[4];
  document.getElementById('resBinMask').innerHTML=maskBinary;
  document.getElementById('resBinNet').innerHTML=netBinary;
  document.getElementById('resBinBC').innerHTML=bcBinary;
  document.getElementById('resClasses').innerHTML=standardClass;
  document.getElementById('resSubnetId').innerHTML=cidr;
  document.getElementById('resMaxHost').innerHTML=maxHost+" possible host(s) in current subnet";
  document.getElementById('resMaxNet').innerHTML=maxSubnet+" total possible subnets, "+maxCurrentSubnetBlock+" possible subnets in current block"; 
  document.getElementById('resImportantBlock').innerHTML=importantBlock;
  }
  else
  {
    alert("Invalid Value");
  }
  
}
