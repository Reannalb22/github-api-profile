window.onload = function(){
	var urlRoot= 'https://api.github.com/users/'
		
	
	function putInto(property,element,responseObj,image){
		if (image === 1){
			$(element)[0].src = responseObj[property]
		}
		else {
			$(element)[0].innerHTML = responseObj[property];
		}
	}


	var setupPropsOnPage = function(responseObj){
		putInto('avatar_url', '#profilePic', responseObj,1)
		putInto('name','#name',responseObj)
		putInto('location', '#location',responseObj)
		putInto('email', '#email',responseObj)
		putInto('blog', '#blog',responseObj)
	}

	var makeRepos = function(repoArr){
		var ulElement = $('#listedRepos')[0];
		ulElement.innerHTML = ''
		
		repoArr.forEach(function(repObj){
			var repoLine = repObj.name
			var newRepoItem = document.createElement('li')
			newRepoItem.innerHTML = repoLine
			ulElement.appendChild(newRepoItem)
		})
	}

	var doAjax = function(query){
		var ajaxParamsRepo = {
			url: urlRoot + query.replace('#', '') + '/repos',
			success: makeRepos
		}
console.log(urlRoot + query.replace('#', '') + '/repos')
		$.ajax(ajaxParamsRepo)

		var ajaxParams = {
			url: urlRoot + query.replace('#', ''),
			success: setupPropsOnPage
		}
		
		$.ajax(ajaxParams)
	}

//set up enter key

	var getUserQuery = function(event){
		console.log(event)
		if(event.keyCode === 13){
			var inputEl = event.srcElement
				query = inputEl.value
			inputEl.value = ''
			location.hash = query
			console.log(location.hash)
		}
	}

//set up event listener

	var handleInput = function(){
		var inputEl = $('input')[0]
		inputEl.onkeypress = getUserQuery
		var query = location.hash
		console.log(location.hash)
		doAjax(query)
	}

	window.onhashchange = function(){
		var query = location.hash
		console.log(location.hash)
		doAjax(query)
	}

	handleInput()

}
	
	

	// var ajaxResponse = $.ajax(ajaxParams)
	// var ajaxResp = $.ajax(ajaxParamsRepo)

		// .success(successFunction);

	// window.ajaxResponse = ajaxResponse








// var makeRepos = function(repoArr){
// 		var ulElement = $('#listedRepos')[0];
		
// 		repoArr.forEach(function(repObj){
// 			ulElement.innerHTML += "<li>" + repObj.name + "</li>"
// 		})
// 	}

	// $("#repos li")