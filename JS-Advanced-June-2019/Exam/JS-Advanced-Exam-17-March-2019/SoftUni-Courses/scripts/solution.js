function solve() {
    const coursesPrice = {
        'js-fundamentals': 170,
        'js-advanced': 180,
        'js-applications': 190,
        'js-web': 490
    };

    document.querySelector('button[value="signMeUp"]').addEventListener('click', makeList);
    const myCourses = document.querySelector('#myCourses > div.courseBody > ul');
    const cost = document.querySelector('#myCourses > div.courseFoot > p');
    let [coursesSinged, coursesCost] = [[], 0];

    function makeList() {
        [myCourses.textContent, coursesSinged, coursesCost] = ['', [], 0];

        const radio = Array.from(document.getElementsByName('educationForm'))
            .filter((input) => input.checked === true)[0];

        const liList = Array.from(document.getElementsByTagName('li'))
            .filter((li) => li.firstElementChild.checked === true);

        liList.forEach((li) => {
            const courseName = li.lastElementChild.textContent.split('-')
                .map((x) => x.trim())[0].split(' ').join('-');

            coursesSinged.push(li.firstElementChild.value);
            attachCourse(courseName);
        });

        if (coursesSinged.length === 4) {
            attachCourse('HTML and CSS');
        }

        cost.textContent = `Cost: ${Math.floor(calculateSum(radio)).toFixed(2)} BGN`;
    }

    function attachCourse(courseName) {
        const liOutput = document.createElement('li');
        liOutput.textContent = courseName;
        myCourses.appendChild(liOutput);
    }

    function calculateSum(radio) {
        if (coursesSinged.indexOf('js-fundamentals') > -1) {
            coursesCost += coursesPrice['js-fundamentals'];
        }

        if (coursesSinged.indexOf('js-advanced') > -1) {
            coursesCost += coursesPrice['js-advanced'];
        }

        if (coursesSinged.indexOf('js-applications') > -1) {
            coursesCost += coursesPrice['js-applications'];
        }

        if (coursesSinged.includes('js-fundamentals') &&
            coursesSinged.includes('js-advanced')) {
            coursesCost -= coursesPrice['js-advanced'] * 0.10;
        }

        if (coursesSinged.includes('js-fundamentals') &&
            coursesSinged.includes('js-advanced') &&
            coursesSinged.includes('js-applications')) {
            coursesCost -= coursesCost * 0.06;
        }

        if (coursesSinged.indexOf('js-web') > -1) {
            coursesCost += coursesPrice['js-web'];
        }

        if (radio.value === 'online' && coursesCost > 0) {
            coursesCost -= coursesCost * 0.06;
        }

        return coursesCost;
    }
}
