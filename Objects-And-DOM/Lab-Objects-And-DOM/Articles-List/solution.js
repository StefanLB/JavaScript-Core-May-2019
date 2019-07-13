function createArticle() {
	const title = document.querySelector('input[id="createTitle"]');
	const content = document.querySelector('textarea[id="createContent"]');

	if (!title.value || !content.value) {
		return;
	}

	const h3 = document.createElement('h3');
	const p = document.createElement('p');
	const article = document.createElement('article');

	[h3.innerHTML, p.innerHTML] = [title.value, content.value];
	article.appendChild(h3);
	article.appendChild(p);

	document.querySelector('section[id="articles"]').appendChild(article);
	[title.value, content.value] = ['', ''];
}
