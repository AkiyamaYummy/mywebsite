//{{{
var A = 0x01234567;
var B = 0x89abcdef;
var C = 0xfedcba98;
var D = 0x76543210;
//}}}
//{{{
function F(x,y,z){ return (x&y)|((~x)&z); }
function G(x,y,z){ return (x&z)|(y&(~z)); }
function H(x,y,z){ return x^y^z; }
function I(x,y,z){ return y^(x|(~z)); }
//}}}
//{{{
function FF(a,b,c,d,Mj,s,ti){
	return b+((a+F(b,c,d)+Mj+ti)<<s);	
}
function GG(a,b,c,d,Mj,s,ti){
	return b+((a+G(b,c,d)+Mj+ti)<<s);
}
function HH(a,b,c,d,Mj,s,ti){
	return b+((a+H(b,c,d)+Mj+ti)<<s);
}
function II(a,b,c,d,Mj,s,ti){
	return b+((a+I(b,c,d)+Mj+ti)<<s);
}
//}}}
//{{{
function first(M,arr){
	var a=arr[0],b=arr[1],c=arr[2],d=arr[3];
	a=FF(a,b,c,d,M[ 0], 7,0xd76aa478);
	b=FF(d,a,b,c,M[ 1],12,0xe8c7b756);
	c=FF(c,d,a,b,M[ 2],17,0x242070db);
	d=FF(b,c,d,a,M[ 3],22,0xc1bdceee);
	a=FF(a,b,c,d,M[ 4], 7,0xf57c0faf);
	b=FF(d,a,b,c,M[ 5],12,0x4787c62a);
	c=FF(c,d,a,b,M[ 6],17,0xa8304613);
	d=FF(b,c,d,a,M[ 7],22,0xfd469501);
	a=FF(a,b,c,d,M[ 8], 7,0x698098d8);
	b=FF(d,a,b,c,M[ 9],12,0x8b44f7af);
	c=FF(c,d,a,b,M[10],17,0xffff5bb1);
	d=FF(b,c,d,a,M[11],22,0x895cd7be);
	a=FF(a,b,c,d,M[12], 7,0x6b901122);
	b=FF(d,a,b,c,M[13],12,0xfd987193);
	c=FF(c,d,a,b,M[14],17,0xa679438e);
	d=FF(b,c,d,a,M[15],22,0x49b40821);
	return new_array(a,b,c,d);
}
function second(M,arr){
	var a=arr[0],b=arr[1],c=arr[2],d=arr[3];
	a=GG(a,b,c,d,M[ 1], 5,0xf61e2562);
	b=GG(d,a,b,c,M[ 6], 9,0xc040b340);
	c=GG(c,d,a,b,M[11],14,0x265e5a51);
	d=GG(b,c,d,a,M[ 0],20,0xe9b6c7aa);
	a=GG(a,b,c,d,M[ 5], 5,0xd62f105d);
	b=GG(d,a,b,c,M[10], 9,0x02441453);
	c=GG(c,d,a,b,M[15],14,0xd8a1e681);
	d=GG(b,c,d,a,M[ 4],20,0xe7d3fbc8);
	a=GG(a,b,c,d,M[ 9], 5,0x21e1cde6);
	b=GG(d,a,b,c,M[14], 9,0xc33707d6);
	c=GG(c,d,a,b,M[ 3],14,0xf4d50d87);
	d=GG(b,c,d,a,M[ 8],20,0x455a14ed);
	a=GG(a,b,c,d,M[13], 5,0xa9e3e905);
	b=GG(d,a,b,c,M[ 2], 9,0xfcefa3f8);
	c=GG(c,d,a,b,M[ 7],14,0x676f02d9);
	d=GG(b,c,d,a,M[12],20,0x8d2a4c8a);
	return new_array(a,b,c,d);
}
function third(M,arr){
	var a=arr[0],b=arr[1],c=arr[2],d=arr[3];
	a=HH(a,b,c,d,M[ 5], 4,0xfffa3942);
	b=HH(d,a,b,c,M[ 8],11,0x8771f681);
	c=HH(c,d,a,b,M[11],16,0x6d9d6122);
	d=HH(b,c,d,a,M[14],23,0xfde5380c);
	a=HH(a,b,c,d,M[ 1], 4,0xa4beea44);
	b=HH(d,a,b,c,M[ 4],11,0x4bdecfa9);
	c=HH(c,d,a,b,M[ 7],16,0xf6bb4b60);
	d=HH(b,c,d,a,M[10],23,0xbebfbc70);
	a=HH(a,b,c,d,M[13], 4,0x289b7ec6);
	b=HH(d,a,b,c,M[ 0],11,0xeaa127fa);
	c=HH(c,d,a,b,M[ 3],16,0xd4ef3085);
	d=HH(b,c,d,a,M[ 6],23,0x04881d05);
	a=HH(a,b,c,d,M[ 9], 4,0xd9d4d039);
	b=HH(d,a,b,c,M[12],11,0xe6db99e5);
	c=HH(c,d,a,b,M[15],16,0x1fa27cf8);
	d=HH(b,c,d,a,M[ 2],23,0xc4ac5665);
	return new_array(a,b,c,d);
}
function fourth(M,arr){
	var a=arr[0],b=arr[1],c=arr[2],d=arr[3];
	a=II(a,b,c,d,M[ 0], 6,0xf4292244);
	b=II(d,a,b,c,M[ 7],10,0x432aff97);
	c=II(c,d,a,b,M[14],15,0xab9423a7);
	d=II(b,c,d,a,M[ 5],21,0xfc93a039);
	a=II(a,b,c,d,M[12], 6,0x655b59c3);
	b=II(d,a,b,c,M[ 3],10,0x8f0ccc92);
	c=II(c,d,a,b,M[10],15,0xffeff47d);
	d=II(b,c,d,a,M[ 1],21,0x85845dd1);
	a=II(a,b,c,d,M[ 8], 6,0x6fa87e4f);
	b=II(d,a,b,c,M[15],10,0xfe2ce6e0);
	c=II(c,d,a,b,M[ 6],15,0xa3014314);
	d=II(b,c,d,a,M[13],21,0x4e0811a1);
	a=II(a,b,c,d,M[ 4], 6,0xf7537e82);
	b=II(d,a,b,c,M[11],10,0xbd3af235);
	c=II(c,d,a,b,M[ 2],15,0x2ad7d2bb);
	d=II(b,c,d,a,M[ 9],21,0xeb86d391);
	return new_array(a,b,c,d);
}
//}}}
//{{{
var char_list={
'0': 0,'1': 1,'2': 2,'3': 3,'4': 4,'5': 5,'6': 6,'7': 7,
'8': 8,'9': 9,'a':10,'b':11,'c':12,'d':13,'e':14,'f':15,
'g':16,'h':17,'i':18,'j':19,'k':20,'l':21,'m':22,'n':23,
'o':24,'p':25,'q':26,'r':27,'s':28,'t':29,'u':30,'v':31,
'w':32,'x':33,'y':34,'z':35,'A':36,'B':37,'C':38,'D':39,
'E':40,'F':41,'G':42,'H':43,'I':44,'J':45,'K':46,'L':47,
'M':48,'N':49,'O':50,'P':51,'Q':52,'R':53,'S':54,'T':55,
'U':56,'V':57,'W':58,'X':59,'Y':60,'Z':61,'_':62,'@':63,
};
//}}}
//{{{
var has_add_1 = false;
function get_hex(str){
	var lth = str.length;
	if(lth%2 == 1){str+='w';has_add_1=true;}
	var hex_all = new Array(),res_all = new Array();
	var char_1,char_2;
	for(var con=0;con < str.length;){
		char_1 = char_list[str[con++]];
		char_2 = char_list[str[con++]];
		hex_all.push(Math.floor(char_1/4),
					(char_1%4)*4+Math.floor(char_2/16),
					char_2%16);
	}
	for(var con=0;con < hex_all.length;){
		var num_8bit=0,num_1bit;
		for(var sub_con=0;sub_con<8;sub_con++){
			if(con==hex_all.length){
				if(has_add_1)num_1bit=0;
				else{ num_1bit=8; has_add_1=true; }
			}else num_1bit=hex_all[con++];
			num_8bit=num_8bit*16+num_1bit;
		}
		res_all.push(num_8bit);
	}
	return res_all;
}
function get_group(str){
	var hex_arr = get_hex(str);
	var hex_group = new Array(),sub_group;
	if(hex_arr.length % 16 == 0){
		hex_arr.push(0x80000000);
		has_add_1 = true;
	}
	for(var con=0;con<hex_arr.length;){
		sub_group=new Array();
		for(var sub_con=0;sub_con<16;sub_con++){
			if(con==hex_arr.length){
				if(sub_con==15){
					sub_group.push(str.length)
				}else if(has_add_1) sub_group.push(0);
				else{
					sub_group.push(0x80000000);
					has_add_1=true;
				}
			}else{
				sub_group.push(hex_arr[con++]);
			}
		}
		hex_group.push(sub_group);
	}
	return hex_group;
}
//}}}
//{{{
function new_array(a,b,c,d){
	var arr=new Array();
	arr.push(a); arr.push(b);
	arr.push(c); arr.push(d);
	return arr;
}
function add_array(arr1,arr2){
	var arr = new Array();
	for(var con=0;con<arr1.length&&con<arr2.length;con++)
		arr.push(arr1[con]+arr2[con]);
	return arr;
}
//}}}
function md5_code(str){
	hex_group=get_group(str);
	var code=new_array(A,B,C,D);
	for(var con=0;con<hex_group.length;con++){
		code = add_array(code,first(hex_group[con],code));
		code = add_array(code,second(hex_group[con],code));
		code = add_array(code,third(hex_group[con],code));
		code = add_array(code,fourth(hex_group[con],code));
	}
	var code_res="";
	for(var con=0;con<4;con++){
		code[con] = (code[con]>>>0).toString(16);
		while(code[con].length < 8)code[con]='0'+code[con];
		code_res += code[con];
	}
	return code_res;
}
