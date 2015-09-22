window.onload = function(){
	var urlRoot= 'https://api.github.com/users/'
	
	var createProfile = function(responseObj) {
		console.log(responseObj);

		$("#profilePic").attr("src",responseObj.avatar_url);
		$("#login")[0].innerHTML = responseObj.login; 
		$("#name")[0].innerHTML = responseObj.name;
		$('#created_at')[0].innerHTML = "<i class='fa fa-clock-o'></i>" + " Joined " + responseObj.created_at;
		$("#followers")[0].innerHTML = "<span>" + responseObj.followers + "</span>" + "<br>" + "<p>" + "Followers" + "</p>";
		$("#starred")[0].innerHTML = "<span>" + "0" + "</span>" + "<br>" + "<p>" +"Starred" + "</p>";
		$("#following")[0].innerHTML =  "<span>" + responseObj.following + "</span>" + "<br>" + "<p>" + "Following" + "</p>" ; 
	}
	
	
	// function putInto(property,element,responseObj,image){
	// 	if (image === 1){
	// 		$(element)[0].src = responseObj[property]
	// 	}
	// 	else {
	// 		$(element)[0].innerHTML = responseObj[property];
	// 	}
	// }

	// var putInDate = function(property, element, responseData){
	// 	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October','November'.'December']
	// 	var d = new Date(responseData[property]);
	// 	$(element)[0].innerHTML = "joined on " + months[d.getUTCMonth()-1]+" "+d.getDate()+", "+d.getUTCFullYear();
	// }

	// var setupPropsOnPage = function(responseObj){
	// 	console.log(responseObj)
	// 	putInto('avatar_url', '#profilePic', responseObj,1)
	// 	putInto('name','#name',responseObj)
	// 	putInto('login','#login',responseObj)
	// 	putInto('location', '#location',responseObj)
	// 	putInto('email', '#email',responseObj)
	// 	putInto('blog', '#blog',responseObj)
	// 	// putInto('html_url', '#html_url',responseObj)
	// 	// putInDate('created_at', '#created_at',responseObj)
	// 	putInto('followers', '#followers',responseObj)
	// 	putInto('following', '#following',responseObj)
	// 	putInto('starred', '#starred', responseObj)
	// }


	// var formatListEl = function(repObj){
	// 	console.log(repObj)
	// 	var repoLine = '<a href=' + repObj.html_url + '>' + repObj.name + '</a>'
	// 		repoLine += '<p>' + repObj.updated_at + '</p>'
	// 		// repoLine += '<a href=' + repObj.stargazers_url + ">" + repObj.starred + '</a>'
	// 		repoLine += '<span>' + repObj.followers + '</span>'
	// 		repoLine += '<span>' + repObj.following + '</span>' + '<br>' + '<p>' + 'Following' + '</p>';
	// 	return repoLine;
	// }

	// var betweenTimes = function() {
	// 	var then = new Date('updated_at')
	// 	var thenSeconds = then.getTime()
	// 	var nowSeconds = d.getTime()
	// 	var betweenTimes = nowSeconds - thenSeconds
	// 	var betweenDays = betweenTimes / (1000 * 60 * 60 * 24)
	// 	betweenDays;
	// }

	var makeRepos = function(repoArr){
		console.log(repoArr)
		var ulElement = $('#listedRepos')[0];
		ulElement.innerHTML = ''
		
		repoArr.forEach(function(repObj){
			var newLine = document.createElement('hr')
			ulElement.innerHTML += "<div class = repos>" + "<a href=" + repObj.url + " class = repoName>" + repObj.name + "</a>" + "<br>" + "<p class = createdOn>" + repObj.created_at + "</p>"
			ulElement.appendChild(newLine)
		})
	}


	var doAjax = function(query){
		var ajaxParamsRepo = {
			url: urlRoot + query.replace('#', '') + '/repos',
			success: makeRepos
		}

		$.ajax(ajaxParamsRepo)

		var ajaxParams = {
			url: urlRoot + query.replace('#', ''),
			success: createProfile
		}
		
		$.ajax(ajaxParams)
	}

//set up enter key event listener

	var getUserQuery = function(event){
		console.log(event)
		if(event.keyCode === 13){
			var inputEl = event.srcElement
				query = inputEl.value
			inputEl.value = ''
			location.hash = query
			//location.hash puts query with hash at end of url
		}
	}

//set up event listener

	var changeUser = function(){
		var inputEl = $('input')[0]
		inputEl.onkeypress = getUserQuery
		var query = location.hash
		doAjax(query)
	}

//this waits on URL (hash) to change, runs this anonymous function
	window.onhashchange = function(){
		var query = location.hash
		console.log(location.hash)
		doAjax(query)
	}

	// var showLanding = function(){

	// }

	changeUser()

}


// var makeRepos = function(repoArr){
// 		console.log(repoArr)
// 		var ulElement = $('#listedRepos')[0];
// 		ulElement.innerHTML = ''
		
// 		repoArr.forEach(function(repObj){
// 			var listElContent = formatListEl(repObj)
// 			var newRepoItem = document.createElement('li')
// 			// var newLine = document.createElement('hr')
// 			newRepoItem.innerHTML = listElContent
// 			ulElement.appendChild(newRepoItem)
// 			// ulElement.appendChild(newLine)
// 		})
// 	}
	