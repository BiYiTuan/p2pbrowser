
if(typeof PPEasy_Hooked=='undefined')
{
	PPEasy_Hooked=true;
	fetch('http://127.0.0.1:1960/Close?').then(function(res){		
		if (res.ok) { 
			var inth=null; 
			inth=setInterval(function  (){	  
				var addf=0; 
				for(var k=0;k<document.getElementsByTagName('video').length;k++)
				{			 
					
					var vobj=document.getElementsByTagName('video')[k]; 
					if(typeof  vobj.playobj=='undefined') { 
						addf=1;
						if(vobj.childNodes.length && typeof vobj.childNodes[0].src!='undefined' && vobj.childNodes[0].src!="")
						{
							vobj.src=vobj.childNodes[0].src;
							var url=vobj.src.substring(
								vobj.src.indexOf('://')+3);
							vobj.src='http://127.0.0.1:1960/play/'+url;
							vobj.childNodes[0].src='';
						} 
						if(vobj.src.substring(0,5)!='blob:' && vobj.src.substring(0,vobj.src.indexOf('/',7)+1)!='http://127.0.0.1:1960/' )
						{
							var url='';
							if(vobj.src!='')
							{
								url=vobj.src.substring(vobj.src.indexOf('://')+3);
								vobj.src='http://127.0.0.1:1960/play/'+url;
							}else
							if(vobj.childNodes.length)
							{
								url=vobj.childNodes[0].src.substring(vobj.childNodes[0].src.indexOf('://')+3);
								vobj.childNodes[0].src='';
								vobj.src='http://127.0.0.1:1960/play/'+url;
							}
						};					
						vobj.playobj=vobj.play; 
						vobj.play=function(){ 								
							if(this.src.substring(0,5)!='blob:' && this.src.substring(0,this.src.indexOf('/',7)+1)!='http://127.0.0.1:1960/'   )
							{					
								var url='';
								if(this.src!='')
								{
									url=this.src.substring(this.src.indexOf('://')+3);
									this.src='http://127.0.0.1:1960/play/'+url;
								}else
								if(this.childNodes.length)
								{
									url=this.childNodes[0].src.substring(this.childNodes[0].src.indexOf('://')+3);
									this.childNodes[0].src='';
									this.src='http://127.0.0.1:1960/play/'+url;
								}
							};	
							this.playobj();
						}
						//
					}
				} 
				if(addf){
			
					if(inth!=null) 
					{
						clearInterval(inth);				 
					}
					var inth2=setInterval(function(){ 
						for(var k=0;k<document.getElementsByTagName('video').length;k++)
						{
							var vobj=document.getElementsByTagName('video')[k];
							if(vobj.readyState==4)
							{ 						
								clearInterval(inth2);
							}
							if(!vobj.paused && !(vobj.readyState==4)){ 
								vobj.load();
								vobj.play();
							}
						}
					},3000); 
					return 1;
				} 
				return 0;
			} ,100); 
		}
		return null;
	});
}
