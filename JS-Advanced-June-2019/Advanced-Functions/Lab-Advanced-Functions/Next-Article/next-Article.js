function getArticleGenerator(input) {
	return (function () {
		const articles = input.slice(0);

		return function () {
			if (articles.length > 0) {
				const article = document.createElement('article');
				const p = document.createElement('p');
				p.textContent = articles.shift();
				article.appendChild(p);
				document.getElementById('content').appendChild(article);
			}
		}
	})();
}
