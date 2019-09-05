(function () {
    const appKey = 'kid_B1Li06S-H';
    const [username, password] = ['guest', 'guest'];
    const [baseUrl, endPoint] = ['https://baas.kinvey.com/appdata', 'students'];

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`
    };

    const students = document.querySelector('.students');
    document.querySelector('.addStudent').addEventListener('click', createStudent);
    const notification = document.querySelector('.notification');

    function createStudent(event) {
        event.preventDefault();

        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const facultyNumber = document.getElementById('facultyNumber');
        const grade = document.getElementById('grade');

        if (!firstName.value) {
            showNotification('First name must be a string!');
            return;
        }

        if (!lastName.value) {
            showNotification('Last name must be a string!');
            return;
        }

        if (!/\d+/.test(facultyNumber.value)) {
            showNotification('Faculty number must be a string of numbers!');
            return;
        }

        if (!grade.value) {
            showNotification('Grade must be a number between 1 and 12!');
            return;
        }

        showNotification('Loading students...');

        const student = {
            firstName: firstName.value,
            lastName: lastName.value,
            facultyNumber: facultyNumber.value,
            grade: Number(grade.value),
            timestamp: Date.now()
        };

        fetch(`${baseUrl}/${appKey}/${endPoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(student)
        }).then((data) => {
            [firstName.value, lastName.value, facultyNumber.value, grade.value] = ['', '', '', ''];
            listStudents();
        }).catch((err) => {
            console.log(err);
        });
    }

    function listStudents() {
        fetch(`${baseUrl}/${appKey}/${endPoint}`, {
            method: 'GET',
            headers
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else if (!res.ok) {
                throw res;
            }
        }).then((data) => {
            students.textContent = '';

            data.sort((a, b) => a.timestamp - b.timestamp).forEach((student, index) => {
                const tr = document.createElement('tr');

                tr.innerHTML =
                    `<tr ${student._id}>
                        <td>${index + 1}</td>
                        <td>${student.firstName}</td>
                        <td>${student.lastName}</td>
                        <td>${student.facultyNumber}</td>
                        <td>${student.grade}</td>
                        <td><button>x</button></td>
                    </tr>`;
                tr.lastElementChild.addEventListener('click', () => deleteStudent(student._id));
                students.appendChild(tr);
            });
        }).catch((err) => {
            console.log(`${err.status} ${err.statusText}`);
        });
    }

    function deleteStudent(id) {
        showNotification('Student deleted.');
        fetch(`${baseUrl}/${appKey}/${endPoint}/${id}`, {
            method: 'DELETE',
            headers
        }).then(() => {
            listStudents();
        }).catch((err) => {
            console.log(err);
        });
    }

    function showNotification(message) {
        notification.style.visibility = 'visible';
        notification.textContent = message;
        setTimeout(() => {
            notification.style.visibility = 'hidden';
        }, 4000);
    }
})();
