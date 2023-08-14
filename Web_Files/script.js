const GITkeyCookieName = "gitkeycookie";
var gitkeyData;
const is_sellected = [false];

var countlover20acc = 0;
const nicknameS = "clikedButtons";
const time_char_lenght = 6;
var jsonData;

const sec = 1000;
const minute = sec * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;

const d = new Date();



/*function fetching() {
    const headers = new Headers();
    //var apiKey = readCookie(GITkeyCookieName); // Replace with your actual GitHub API key
    headers.append("Authorization", "Bearer " + apiKey);

    fetch("https://api.github.com/repos/KayaSrtl/valohesapdata/contents/main/data.json", { headers })
        .then(response => response.json())
        .then(data => {
            const content = data.content;
            const decodedContent = atob(content);
            const JSONDATA = JSON.parse(decodedContent);
            
            console.log(JSONDATA.length);
            //writeJSON(JSONDATA);
        })
        .catch(error => console.log(error));
}*/

function fetching() {
    //const apiKey = "ghp_asdafadgsfgadfadsadasd"; // Replace with your actual GitHub API key
    const apiKey = readCookie(GITkeyCookieName); // Replace with your actual GitHub API key
    const repoOwner = "KayaSrtl";
    const repoName = "valohesapdata";
    const filePath = "data.json";
    const branchName = "main";

    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}?ref=${branchName}`;
    
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${apiKey}`);

    fetch(url, { headers })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Request failed with status: ${response.status}`);
            }
        })
        .then(data => {
            const content = data.content;
            const decodedContent = atob(content);
            jsonData = JSON.parse(decodedContent);
		listingAcc(jsonData);
        })
        .catch(error => console.log(error));
}


	
function listingAcc(JSONobj) {
	var index = 0;
	
	for(let i = 0; i < JSONobj.account.lower20lvl.length; i++) {
		if(!JSONobj.account.lower20lvl[i].isSold) {
			if(index > 0) {
				$( '#nick_button_' + (index - 1)).clone().appendTo( ".all_nick_buttons" ).prop('id', 'nick_button_' + index);

			}
			//$('#nick_button_' + index + " .nick_button").text(JSONobj[i].nickname).attr('onclick','copyToClipboardPass(\'#h' + index + '\')').attr('id','h' + index);
			$('#nick_button_' + index + " .nick_button").text(JSONobj.account.lower20lvl[i].nickname).attr('onclick','copyToClipboard(\'#h' + index + '\')').attr('id','h' + index);
			
			$('#nick_button_' + index + " .nick_button_press_part_outer .changecolorpart").attr('onclick','setChange(' + index + ')');
			$('#nick_button_' + index + " .nick_button_press_part_outer .nicktextlower20").text(JSONobj.account.lower20lvl[i].nickname).attr('id','ln' + index);
			$('#nick_button_' + index + " .nick_button_press_part_outer .passtextlower20").text(JSONobj.account.lower20lvl[i].password).attr('id','lp' + index);
			
			$('#nick_button_' + index + " .nick_button_press_part_outer .copynicknamepart").attr('onclick','copyToClipboard(\'#ln' + index + '\')');
			$('#nick_button_' + index + " .nick_button_press_part_outer .copypasspart").attr('onclick','copyToClipboard(\'#lp' + index + '\')');
			//$('#nick_button_' + index + " .nick_button_press_part_outer").text(JSONobj.account.lower20lvl[i].nickname).attr('onclick','copyToClipboard(\'#h' + index + '\')').attr('id','h' + index);
			if(JSONobj.account.lower20lvl[i].lastplayhour + 22 > Math.round(d.getTime() / hour))
				$('#h' + (index)).css('background-color', 'red');
			else
				$('#h' + (index)).css('background-color', '');
			//$('#nick_and_pass_button_' + index + " .pass_part").text(JSONobj[i].password).attr('onclick','copyToClipboardPass(\'#p' + index + '\')').attr('id','p' + index);
			index++;
		}
	}
	
	index = 0;
	
	for(let i = 0; i < JSONobj.account.upper20lvl.length; i++) {
		if(!JSONobj.account.upper20lvl[i].isSold) {
			if(index > 0) {
				$( '#nick_and_pass_button_' + (index - 1)).clone().appendTo( ".upper20_accounts" ).prop('id', 'nick_and_pass_button_' + index);

			}
			$('#nick_and_pass_button_' + index + " .nick_part").text(JSONobj.account.upper20lvl[i].nickname).attr('onclick','copyToClipboard(\'#m' + index + '\')').attr('id','m' + index);
			$('#nick_and_pass_button_' + index + " .pass_part").text(JSONobj.account.upper20lvl[i].password).attr('onclick','copyToClipboard(\'#p' + index + '\')').attr('id','p' + index);
			index++;
		}
	}
}

/*const jsonData = {
  "account": {
    "upper20lvl": [
      {
			"nickname": "NicknameUpperLvl1",
			"password": "PasswordUpperLvl1",
			"isSold": false
	  },
      {
			"nickname": "NicknameUpperLvl2",
			"password": "PasswordUpperLvl2",
			"isSold": false
      }
    ],
    "lower20lvl": [
      {
		  	"nickname": "NicknameLowerLvl1",
		  	"password": "PasswordLowerLvl1",
			"isSold": false,
			"lastplayhour": 0
	  },
      {
			"nickname": "NicknameLowerLvl2",
			"password": "PasswordLowerLvl2",
			"isSold": false,
			"lastplayhour": 0
      }
    ]
  }
};*/










$( document ).ready(function() {
	
	fetching();
	
	
	
	/*const newNickname = "NewNickname";
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
console.log("Lower Level Nickname:", lowerNickname);*/
	
	
	gitkeyData = readCookie(GITkeyCookieName);
	if(gitkeyData) {
		$("#inputText").css("display", "none");
		
	} else {
		$("#resetkeybutton").css("display", "none");
	}
	
	
		
	//setArray(nicknameS);
	
	
	
	
	//for (let i = 0; i < countlover20acc-1; i++)
		//is_sellected.push(false);
	
	//buttonValidation();
	//submitButtons();
});

function copyToClipboard(element) {

	var $temp = $("<input>");
	$("body").append($temp);
	$temp.val($(element).text()).select();
	document.execCommand("copy");
	$temp.remove();
  
	
	
	

	//var idletter = element.substr(1, 1);
	//var index = parseInt((element.substr(2, 3)));
  
}

function setChange(index) {
	if($('#h' + (index)).css('background-color') == 'rgb(255, 0, 0)') {
		$('#h' + (index)).css('background-color', '');
		jsonData.account.lower20lvl[index].lastplayhour = 0;
	} else {
		$('#h' + (index)).css('background-color', 'red');
		jsonData.account.lower20lvl[index].lastplayhour = Math.round(d.getTime() / hour);
	}
	submitJSON();
	
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

  //const token = 'ghp_ıaıjdfıoahjıthfq3hıahgıahegıfhıaehgodebngo';
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
