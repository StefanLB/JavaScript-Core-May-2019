function solve() {
    const dataList = JSON.parse(document.getElementById('arr').value);
    const result = document.getElementById('result');
    result.textContent = '';

    const pattern = /^([A-Z][a-z]* [A-Z][a-z]*) (\+359([ \-])\d\3\d{3}\3\d{3}) ([a-z\d]+@[a-z]+\.[a-z]{2,3})$/;

    const outputList = dataList.reduce((accList, data) => {
        const userInfo = data.match(pattern);

        if (userInfo === null) {
            accList.push('Invalid data');
        } else {
            accList.push(`Name: ${userInfo[1]}`);
            accList.push(`Phone Number: ${userInfo[2]}`);
            accList.push(`Email: ${userInfo[4]}`);
        }

        accList.push('- - -');
        return accList;
    }, []);

    outputList.forEach((info) => {
        const p = document.createElement('p');
        p.textContent = info;
        result.appendChild(p);
    });
}
