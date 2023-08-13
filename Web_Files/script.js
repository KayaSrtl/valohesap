//All rights belong to Kaya Sertel
const GITkeyCookieName = "gitkeycookie";
var gitkeyData;
const is_sellected = [false];

/*let headers = new Headers();
headers.append("Authorization", "Bearer " + readCookie(GITkeyCookieName));

fetch("https://api.github.com/repos/KayaSrtl/valohesapdata/contents/data.json", { headers })
    .then(response => response.json())
    .then(data => {
        let JSONDATA = JSON.parse(atob(data.content));
		
		console.log(JSONDATA.length);
		//writeJSON(JSONDATA);
    })
    .catch(error => console.log(error));
	*/
	
function writeJSON(JSONobj) {
	let index = 0;
	let indexlower20 = 0;
	let indexupper20 = 0;

	/*for(let i = 0; i < nickname.length; i++) {
		if(1) {
			if(index > 0) {
				$( '#nick_button_' + (index - 1)).clone().appendTo( ".all_nick_buttons" ).prop('id', 'nick_button_' + index);

			}
			//$('#nick_button_' + index + " .nick_button").text(JSONobj[i].nickname).attr('onclick','copyToClipboardPass(\'#h' + index + '\')').attr('id','h' + index);
			$('#nick_button_' + index + " .nick_button").text(nickname[i]).attr('onclick','copyToClipboard(\'#h' + index + '\')').attr('id','h' + index);
			//$('#nick_and_pass_button_' + index + " .pass_part").text(JSONobj[i].password).attr('onclick','copyToClipboardPass(\'#p' + index + '\')').attr('id','p' + index);
			index++;
		}
	}*/
	
	for(let i = 0; i < JSONobj.length; i++) {
		if(!JSONobj[i].isSold && !JSONobj[i].isUpper20) {
			if(indexlower20 > 0) {
				$( '#nick_button_' + (indexlower20 - 1)).clone().appendTo( ".all_nick_buttons" ).prop('id', 'nick_button_' + indexlower20);

			}
			//$('#nick_button_' + index + " .nick_button").text(JSONobj[i].nickname).attr('onclick','copyToClipboardPass(\'#h' + index + '\')').attr('id','h' + index);
			$('#nick_button_' + indexlower20 + " .nick_button").text(JSONobj[i].nickname).attr('onclick','copyToClipboard(\'#h' + indexlower20 + '\')').attr('id','h' + indexlower20);
			//$('#nick_and_pass_button_' + index + " .pass_part").text(JSONobj[i].password).attr('onclick','copyToClipboardPass(\'#p' + index + '\')').attr('id','p' + index);
			indexlower20++;
		}
		if(!JSONobj[i].isSold && JSONobj[i].isUpper20) {
			if(indexupper20 > 0) {
				$( '#nick_and_pass_button_' + (indexupper20 - 1)).clone().appendTo( ".upper20_accounts" ).prop('id', 'nick_and_pass_button_' + indexupper20);

			}
			$('#nick_and_pass_button_' + indexupper20 + " .nick_part").text(JSONobj[i].nickname).attr('onclick','copyToClipboardPass(\'#m' + indexupper20 + '\')').attr('id','m' + indexupper20);
			$('#nick_and_pass_button_' + indexupper20 + " .pass_part").text(JSONobj[i].password).attr('onclick','copyToClipboardPass(\'#p' + indexupper20 + '\')').attr('id','p' + indexupper20);
			indexupper20++;
			console.log(indexupper20);
		}
	}
}

const jsonData = {
  "account": {
    "upper20lvl": [
      {
			"nickname": "NicknameUpperLvl1",
			"password": "PasswordUpperLvl1",
			"isSold": true
	  },
      {
			"nickname": "NicknameUpperLvl2",
			"password": "PasswordUpperLvl2",
			"isSold": true
      }
    ],
    "lower20lvl": [
      {
		  	"nickname": "NicknameLowerLvl1",
		  	"password": "PasswordLowerLvl1",
			"isSold": false,
			"isplayed": true,
			"lastplayhour": 198475
	  },
      {
			"nickname": "NicknameLowerLvl2",
			"password": "PasswordLowerLvl2",
			"isSold": false,
			"isplayed": true,
			"lastplayhour": 198302
      }
    ]
  }
};





const newNickname = "NewNickname";
jsonData.account.upper20lvl.push({ "nickname": newNickname });
jsonData.account.lower20lvl.push({ "nickname": newNickname });

var upperNickname = jsonData.account.upper20lvl[2].nickname;
var lowerNickname = jsonData.account.lower20lvl[2].nickname;

console.log("Upper Level Nickname:", upperNickname);
console.log("Lower Level Nickname:", lowerNickname);

jsonData.account.upper20lvl.splice(jsonData.account.upper20lvl.length - 1, 1);
jsonData.account.lower20lvl.splice(jsonData.account.lower20lvl.length - 1, 1);

upperNickname = jsonData.account.upper20lvl[1].nickname;
lowerNickname = jsonData.account.lower20lvl[1].nickname;


console.log("Upper Level Nickname:", upperNickname);
console.log("Lower Level Nickname:", lowerNickname);


var countlover20acc = 0;
const nicknameS = "clikedButtons";
const time_char_lenght = 6;

const sec = 1000;
const minute = sec * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;

const d = new Date();

$( document ).ready(function() {
	gitkeyData = readCookie(GITkeyCookieName);
	if(gitkeyData) {
		$("#inputText").css("display", "none");
		
	} else {
		$("#resetkeybutton").css("display", "none");
	}
		
	//setArray(nicknameS);

	
	//writeJSON(upper20lvlacc);
	
	//for (let i = 0; i < countlover20acc-1; i++)
		//is_sellected.push(false);
	
	//buttonValidation();
	//submitButtons();
});

function copyToClipboard(element, is_submit) {

  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
  
  if (arguments.length == 1) {
  var index = parseInt((element.substr(2, 3)));
  console.log(index);
  is_sellected[index] = is_sellected[index] ? false : true;
  submitButtons(index);
  submitArray(nicknameS, index);
  }
  
}

function generatePassword() {
    var length = 10,
        //charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*-+^!£#$",
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "UwU1";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
	document.getElementById("s31").innerHTML = retVal;
	copyToClipboard('#s31');
}

function resetClickedButtons(sname) {
	if (confirm("Are you sure to reset all buttons?") == true) {
		for (let i = 0; i < countlover20acc; i++) {
			is_sellected[i] = false;
			$('#h' + (i + 1)).css('background-color', '');
		}
		submitArray(nicknameS);
	}
}

function submitArray(sname, index) {
	var string;
	if (arguments.length == 1) {
		string = is_sellected[0] ? "1" + Math.round(d.getTime() / hour) : "0000000";
		
		for(let i = 1; i < countlover20acc; i++) {
			if(is_sellected[i]) {
				string = string + "1";
				string = string + Math.round(d.getTime() / hour);
			}
			else
				string = string + "0000000";
			
		}
	} else {
		string = is_sellected[0] ? "1": "0";
		string += index ? getTimeFromIndex(sname, 0) : is_sellected[0] ? Math.round(d.getTime() / hour) : "000000";
		for(let i = 1; i < countlover20acc; i++) {
			string += is_sellected[i] ? "1" : "0";
			if(i != index)
				string += getTimeFromIndex(sname, i);
			else {
				string += is_sellected[index] ? Math.round(d.getTime() / hour) : "000000";
			}
		}
	}
	localStorage.setItem(sname, string);
}

function setArray(sname) {
	let storage_text = localStorage.getItem(sname);
	for(let i = 0; i < countlover20acc; i++)
		if(storage_text.substr(i*7, 1) == "0")
			is_sellected[i] = false;
		else
			is_sellected[i] = true;
	
}

//alert(getTimeFromIndex(nicknameS, 11));

function getTimeFromIndex(sname, index) {
	return localStorage.getItem(sname).substring(index*7+1,(index+1)*7);
}



function buttonValidation() {
	let is_change = 0;
	let storage_text = localStorage.getItem(nicknameS);
	string = parseInt(getTimeFromIndex(nicknameS, 0));
	for(let i = 0; i < countlover20acc; i++) {
		if(parseInt(getTimeFromIndex(nicknameS, i)) + 22 < Math.round(d.getTime() / hour)){
			//alert(parseInt(getTimeFromIndex(nicknameS, i)) + 22 +" / "+ Math.round(d.getTime() / hour));
			is_sellected[i] = false;
			submitArray(nicknameS, i);
			is_change++;
		}
	}
	//alert(string);
	if(is_change) 
		submitButtons();
	
}

function submitButtons(index) {
	if (arguments.length == 1)
		$('#h' + (index)).css('background-color', is_sellected[index]  ? 'red' : '');
	else
		for(let i = 0; i < countlover20acc; i++)
			if(!is_sellected[i])
				$('#h' + (i)).css('background-color', '');
			else
				$('#h' + (i)).css('background-color', 'red');
}

function getStorage() {
	
	let string = is_sellected[0] ? "1" : "0";
		
	for(let i = 1; i < countlover20acc; i++)
		if(is_sellected[i])
			string = string + "1";
		else
			string = string + "0";
	alert(localStorage.getItem(nicknameS) + ' / ' + Math.round(d.getTime() / hour) + ' / ' + string);
}

function submitJSON() {
	$("#inputText").css("display", "none");
	$("#resetkeybutton").css("display", "unset");
	var inputElement = document.getElementById("inputText");
	if(!gitkeyData) {
		var inputData = inputElement.value;
		gitkeyData = inputData;
		setCookie(GITkeyCookieName, inputData, 300);
	}
		
	console.log(gitkeyData);
	uploadJSON(jsonData, gitkeyData);
		
}


function resetGITKey() {
	deleteCookie(GITkeyCookieName);
	$("#inputText").css("display", "unset");
	$("#resetkeybutton").css("display", "none");
}

//setInterval(buttonValidation, 5000);

//Math.round(d.getTime() / hour)

/*https://stackoverflow.com/questions/4470477/create-array-in-cookie-with-javascript*/



function decodeString(encodedStr) {
  	return atob(encodedStr);
}


function uploadJSON(json_object, key) {
  // Update the data as desired
  /*const updatedData = {
    someKey: 'çok seviyorum'
  };*/

  //const token = 'ghp_k8TjLAS1OV0qEq2sefVZPvcSW4casUws1aqDaJ';
  var token = key;
  const repoOwner = 'KayaSrtl';
  const repoName = 'valohesapdata';
  const filePath = './data.json';

  // Convert the updated data to JSON
  const updatedJsonData = JSON.stringify(json_object, null, 2);

  // Fetch the current file details, including SHA
  fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  })
    .then((response) => {
      if (response.ok) {
		  return response.json();
      } else {
		throw new Error('Failed to fetch file details');
      }
    })
    .then((fileData) => {
      const currentSHA = fileData.sha;

      // Remove backslashes before quotes
      const contentWithoutBackslashes = updatedJsonData.replace(/\\/g, '').replace(/^"(.*)"$/, '$1');

      // Encode the JSON data to base64
      const encoder = new TextEncoder();
      const data = encoder.encode(contentWithoutBackslashes);
      const contentBase64 = btoa(String.fromCharCode.apply(null, new Uint8Array(data)));

      // Make an HTTP request to update the file
      return fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Update JSON file',
          content: contentBase64,
          sha: currentSHA
        })
      });
    })
    .then((response) => {
      if (response.ok) {
        console.log('JSON file updated successfully');
		  return 0;
      } else {
        throw new Error('Failed to update JSON file');
		  return 1;
      }
    })
    .catch((error) => {
      console.error('Error updating JSON file:', error.message);
    });
}



/*function encodeString(str) {
  return btoa(str);
}*/
  
 function deleteCookie(cookieName) {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function readCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
