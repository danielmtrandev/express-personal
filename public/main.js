var heartButtons = document.getElementsByClassName('heart');
// var like = document.getElementsByClassName('fa-heart');
// var unLike = document.getElementsByClassName('fa-heart-broken');
var favorite = document.getElementsByClassName('fa-crown');
var trash = document.getElementsByClassName('fa-trash');

Array.from(heartButtons).forEach(function (heartButton) {
	heartButton.addEventListener('click', function () {
		const likeButton = heartButton.classList.contains('like')

		let like = Number(this.parentNode.parentNode.childNodes[3].innerText) 
		
		if(likeButton){
			like++
		}else{
			like--
		}
		const vrs = this.parentNode.parentNode.childNodes[1].innerText
		// const like = Number(this.parentNode.parentNode.childNodes[3].innerText)
		fetch('verses', {
			method: 'put',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				'vrs': vrs,
				'count': like 
			})
		})
		.then(response => {
			if (response.ok) return response.json()
		})
		.then(data => {
			console.log(data)
			window.location.reload(true)
		})
	});
});

// Array.from(unLike).forEach(function (element) {
// 	element.addEventListener('click', function () {
// 		const vrs = this.parentNode.parentNode.childNodes[1].innerText
// 		const like = Number(this.parentNode.parentNode.childNodes[3].innerText)
// 		fetch('verses', {
// 			method: 'put',
// 			headers: {'Content-Type': 'application/json'},
// 			body: JSON.stringify({
// 				'vrs': vrs,
// 				'count': like - 1
// 			})
// 		})
// 		.then(response => {
// 			if (response.ok) return response.json()
// 		})
// 		.then(data => {
// 			console.log(data)
// 			window.location.reload(true)
// 		})
// 	});
// });

Array.from(favorite).forEach(function (element) {
	element.addEventListener('click', function () {
		const docId = this.parentNode.parentNode.childNodes[7].innerText
		// const vrs = this.parentNode.parentNode.childNodes[1].innerText
		// const favorite = Number(this.parentNode.parentNode.childNodes[4].innerText)
		// console.log(docId)
		fetch('favorite', {
			method: 'put',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				// 'vrs': vrs,
				// 'fav': favorite
				'docId': docId
			})
		})
		.then(response => {
			if (response.ok) return response.json()
		})
		.then(data => {
			console.log(data)
			window.location.reload(true)
		})
	});
});




Array.from(trash).forEach(function (element) {
	element.addEventListener('click', function () {
		const vrs = this.parentNode.parentNode.childNodes[1].innerText;
		fetch('verses', {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				vrs: vrs,
			}),
		}).then(function (response) {
			window.location.reload();
		});
	});
});
