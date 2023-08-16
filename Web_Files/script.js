const GITkeyCookieName = "gitkeycookie";
var gitkeyData;
const is_sellected = [false];

var countlover20acc = 0;
const nicknameS = "clikedButtons";
const time_char_lenght = 6;
var jsonData = [];
var isEditing = false;
var isNewAccountAdding = false;
var current_editing_element_id;

const sec = 1000;
const minute = sec * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;

const d = new Date();




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
	var index = $( '.nick_button_div').length;
	for(let i = 1; i < index; i++)
		$("#nick_button_" + i).remove();
	
	index = 0;
	
	if(JSONobj.account.lower20lvl.length)
		$( '.all_nick_buttons').css("display", "");
	else
		$( '.all_nick_buttons').css("display", "none");
	
	for(let i = 0; i < JSONobj.account.lower20lvl.length; i++) {
		if(index > 0) {
			$( '#nick_button_' + (index - 1)).clone().appendTo( ".all_nick_buttons" ).prop('id', 'nick_button_' + index);

		}
		//$('#nick_button_' + index + " .nick_button").text(JSONobj[i].nickname).attr('onclick','copyToClipboardPass(\'#h' + index + '\')').attr('id','h' + index);
		//$('#nick_button_' + index + " .nick_button").text(JSONobj.account.lower20lvl[i].nickname).attr('onclick','copyToClipboard(\'#h' + index + '\')').attr('id','h' + index);
		$('#nick_button_' + index + " .nick_button").text(JSONobj.account.lower20lvl[i].nickname).attr('id','h' + index);

		$('#nick_button_' + index + " .nick_button_press_part_outer .nicktextlower20").text(JSONobj.account.lower20lvl[i].nickname).attr('id','ln' + index);
		$('#nick_button_' + index + " .nick_button_press_part_outer .passtextlower20").text(JSONobj.account.lower20lvl[i].password).attr('id','lp' + index);

		$('#nick_button_' + index + " .nick_button_press_part_outer .deleteelementpart").attr('onclick','setChange(\'#ld' + index + '\')');
		$('#nick_button_' + index + " .nick_button_press_part_outer .changecolorpart").attr('onclick','setChange(\'#lc' + index + '\')');
		$('#nick_button_' + index + " .nick_button_press_part_outer .copynicknamepart").attr('onclick','setChange(\'#ln' + index + '\')');
		$('#nick_button_' + index + " .nick_button_press_part_outer .copypasspart").attr('onclick','setChange(\'#lp' + index + '\')');
		//$('#nick_button_' + index + " .nick_button_press_part_outer").text(JSONobj.account.lower20lvl[i].nickname).attr('onclick','copyToClipboard(\'#h' + index + '\')').attr('id','h' + index);
		if(JSONobj.account.lower20lvl[i].lastplayhour + 23 > Math.round(d.getTime() / hour))
			$('#h' + (index)).css('background-color', 'red');
		else
			$('#h' + (index)).css('background-color', '');
		//$('#nick_and_pass_button_' + index + " .pass_part").text(JSONobj[i].password).attr('onclick','copyToClipboardPass(\'#p' + index + '\')').attr('id','p' + index);
		index++;
	}
	
	index = $( '.nick_and_pass_button').length;
	for(let i = 1; i < index; i++)
		$("#nick_and_pass_button_" + i).remove();
	
	index = 0;
	
	if(JSONobj.account.upper20lvl.length)
		$( '.upper20_accounts').css("display", "");
	else
		$( '.upper20_accounts').css("display", "none");
	
	for(let i = 0; i < JSONobj.account.upper20lvl.length; i++) {
		if(index > 0) {
			$( '#nick_and_pass_button_' + (index - 1)).clone().appendTo( ".upper20_accounts" ).prop('id', 'nick_and_pass_button_' + index);

		}
		$('#nick_and_pass_button_' + index + " .nick_button").text(JSONobj.account.upper20lvl[i].nickname).attr('id','u' + index);

		$('#nick_and_pass_button_' + index + " .upper20_button_press_part_outer .nicktextupper20").text(JSONobj.account.upper20lvl[i].nickname).attr('id','un' + index);
		$('#nick_and_pass_button_' + index + " .upper20_button_press_part_outer .passtextupper20").text(JSONobj.account.upper20lvl[i].password).attr('id','up' + index);

		$('#nick_and_pass_button_' + index + " .upper20_button_press_part_outer .deleteelementpart").attr('onclick','setChange(\'#ud' + index + '\')');
		$('#nick_and_pass_button_' + index + " .upper20_button_press_part_outer .changeupper20part").attr('onclick','setChange(\'#uc' + index + '\')');
		$('#nick_and_pass_button_' + index + " .upper20_button_press_part_outer .copyupper20nicknamepart").attr('onclick','setChange(\'#un' + index + '\')');
		$('#nick_and_pass_button_' + index + " .upper20_button_press_part_outer .copyupper20passpart").attr('onclick','setChange(\'#up' + index + '\')');
		index++;
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
    ],
	"sold": [
      {
		  	"nickname": "NicknameLowerLvl1",
		  	"password": "PasswordLowerLvl1"
	  },
      {
			"nickname": "NicknameLowerLvl2",
			"password": "PasswordLowerLvl2"
      }
    ]
  }
};
*/





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

function copyRandPass() {
	let retVal = generatePassword();
	document.getElementById("s31").innerHTML = retVal;
	copyToClipboard('#s31');
}

function generatePassword() {
    var length = 10,
        //charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*-+^!£#$",
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "UwU1";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
	return retVal;
}

function resetClickedButtons() {
	if (confirm("Are you sure to reset all buttons?") == true) {
		for (let i = 0; i < jsonData.account.lower20lvl.length; i++) {
			jsonData.account.lower20lvl[i].lastplayhour = 0;
			$('#h' + (i)).css('background-color', '');
		}
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

	} else {
		uploadJSON(jsonData, gitkeyData);
	}
		

		
}


function editAccs() {
	if(isEditing) {
		$("#editAccText").text("Edit");
		$(".upper20_button_press_part_inner").css("width", "");
		$(".nick_button_press_part_inner").css("width", "");
		$(".changeupper20part").css("display", "");
		$(".deleteelementpart").css("display", "");
		$(".add_edit_account_outer").css("display", "");
		
	}
	else {
		$("#editAccText").text("Finish Editing");
		$(".upper20_button_press_part_inner").css("width", "25%");
		$(".nick_button_press_part_inner").css("width", "25%");
		$(".changeupper20part").css("display", "flex");
		$(".deleteelementpart").css("display", "flex");
		
	}
	
	
	isEditing = !isEditing;
}


function setChange(element) {
	var index = parseInt((element.substr(3, 6)));
	var idletter = element.substr(1, 2);
	if(!isEditing) {
		if(idletter == "lc") {
			if($('#h' + (index)).css('background-color') == 'rgb(255, 0, 0)') {
				$('#h' + (index)).css('background-color', '');
				jsonData.account.lower20lvl[index].lastplayhour = 0;
			} else {
				$('#h' + (index)).css('background-color', 'red');
				jsonData.account.lower20lvl[index].lastplayhour = Math.round(d.getTime() / hour);
			}
			submitJSON();
		} else {
			copyToClipboard(element);
		}

	} else {
		if(idletter == "lc") {
			jsonData.account.upper20lvl.push({ "nickname": jsonData.account.lower20lvl[index].nickname,
												"password": jsonData.account.lower20lvl[index].password
											 });
			jsonData.account.lower20lvl.splice(index, 1);		
			//var length = $( '.nick_and_pass_button').length;
			//$( '#nick_and_pass_button_' + (length - 1)).clone().appendTo( ".upper20_accounts" ).prop('id', 'nick_and_pass_button_' + length);
			//$("#nick_button_" + index).remove();
			//$( '#nick_and_pass_button_' + (0)).clone().appendTo( ".upper20_accounts" ).prop('id', 'nick_and_pass_button_' + 2);
			listingAcc(jsonData);
		}
		if(idletter == "uc") {
			jsonData.account.lower20lvl.push({ "nickname": jsonData.account.upper20lvl[index].nickname,
												"password": jsonData.account.upper20lvl[index].password,
											    "lastplayhour": 0
											 });
			jsonData.account.upper20lvl.splice(index, 1);
			var length = $( '.all_nick_buttons').length;
			//$( '#nick_button_' + (length - 1)).clone().appendTo( ".all_nick_buttons" ).prop('id', 'nick_button_' + length);
			//$("#nick_and_pass_button_" + index).remove();
			//console.log('#nick_button_' + (jsonData.account.lower20lvl.length - 1));
			listingAcc(jsonData);
		}
		if(idletter == "ld") {
			jsonData.account.sold.push({ "nickname": jsonData.account.lower20lvl[index].nickname,
									"password": jsonData.account.lower20lvl[index].password
								 });
			jsonData.account.lower20lvl.splice(index, 1);
			listingAcc(jsonData);
		}
		
		if(idletter == "ud") {
			jsonData.account.sold.push({ "nickname": jsonData.account.upper20lvl[index].nickname,
									"password": jsonData.account.upper20lvl[index].password
								 });
			jsonData.account.upper20lvl.splice(index, 1);
			listingAcc(jsonData);
		}
		
		if(idletter == "un" || idletter == "up" || idletter == "ln" || idletter == "lp") {
			$(".add_edit_account_outer").css("display", "flex");
			current_editing_element_id = element;
		}
		
		if(idletter == "un") {
			$("#AccountNameInput").val("");
			$("#AccountPassInput").val(jsonData.account.upper20lvl[index].password);
			$(".Account_Adding_info").text("Old Nickname: " + jsonData.account.upper20lvl[index].nickname);
			$("#AccountNameInput").focus();
			$('#isUpper20checkbox').val('on');
		}
		
		if(idletter == "up") {
			$("#AccountNameInput").val(jsonData.account.upper20lvl[index].nickname);
			$("#AccountPassInput").val("");
			$(".Account_Adding_info").text("Old Password: " + jsonData.account.upper20lvl[index].password);
			$("#AccountPassInput").focus();
			$('#isUpper20checkbox').val('on');
		}
		
		if(idletter == "ln") {
			$("#AccountNameInput").val("");
			$("#AccountPassInput").val(jsonData.account.lower20lvl[index].password);
			$(".Account_Adding_info").text("Old Nickname: " + jsonData.account.lower20lvl[index].nickname);
			$("#AccountNameInput").focus();
			$('#isUpper20checkbox').val('off');
		}
		//valorush01
		if(idletter == "lp") {			
			$("#AccountNameInput").val(jsonData.account.lower20lvl[index].nickname);
			$("#AccountPassInput").val("");
			$(".Account_Adding_info").text("Old Password: " + jsonData.account.lower20lvl[index].password);
			$("#AccountPassInput").focus();
			$('#isUpper20checkbox').val('off');
		}
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
	}
	
}



function resetGITKey() {
	deleteCookie(GITkeyCookieName);
	$("#inputText").css("display", "unset");
	$("#resetkeybutton").css("display", "none");
}


function addNewAccount() {
	if(isNewAccountAdding) {
		$("#AddAccountBtnTxt").text("Add Account");
		$(".add_edit_account_outer").css("display", "");
		
	}
	else {
		$("#AddAccountBtnTxt").text("Cancel Adding");
		$(".add_edit_account_outer").css("display", "flex");
		$(".Account_Adding_info").text("Add Account");
		$("#AccountPassInput").val(generatePassword());
	}
	isNewAccountAdding = !isNewAccountAdding;
}

function SubmitAccountAdding() {
	var newAccName = $("#AccountNameInput").val();
	var newAccPass = $("#AccountPassInput").val();
	var isUpper20checkboxdata = $('#isUpper20checkbox').prop('checked');
	if(isNewAccountAdding) {


		if(newAccName&&newAccPass) {
			if(isUpper20checkboxdata) {
				jsonData.account.upper20lvl.push({ "nickname": newAccName,
												"password": newAccPass
												 });

			} else {
				jsonData.account.lower20lvl.push({ "nickname": newAccName,
											"password": newAccPass,
											"lastplayhour": 0
										 });
			}
			isNewAccountAdding = false;
		}
	} else {
		var index = parseInt((current_editing_element_id.substr(3, 6)));
		var idletter = current_editing_element_id.substr(1, 2);
		if(idletter == "un" || idletter == "up") {
			if(isUpper20checkboxdata) {
				jsonData.account.upper20lvl[index].nickname = newAccName;
				jsonData.account.upper20lvl[index].password = newAccPass;
			} else {
				jsonData.account.upper20lvl.splice(index, 1);
				jsonData.account.lower20lvl.push({ "nickname": newAccName,
											"password": newAccPass,
											"lastplayhour": 0
										 });
				
			}
		} else {
			if(isUpper20checkboxdata) {
				jsonData.account.lower20lvl.splice(index, 1);
				jsonData.account.upper20lvl.push({ "nickname": newAccName,
											"password": newAccPass
										 });
			} else {
				jsonData.account.lower20lvl[index].nickname = newAccName;
				jsonData.account.lower20lvl[index].password = newAccPass;
			}
		}
	}
	$("#AddAccountBtnTxt").text("Add Account");
	$(".add_edit_account_outer").css("display", "");
	listingAcc(jsonData);
}

//setInterval({listingAcc(jsonData);}, 5000);
setInterval(function() {listingAcc(jsonData)}, 100000);

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
