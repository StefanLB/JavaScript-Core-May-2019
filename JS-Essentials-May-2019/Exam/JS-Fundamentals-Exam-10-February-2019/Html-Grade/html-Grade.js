function htmlGrade(examPoints, homeworkCompleted, totalHomework) {
    let [maxPoints, maxExamPoints] = [100, 400];

    let totalPoints = examPoints * 0.90 / maxExamPoints * 100;
    let homeworkPoints = homeworkCompleted / totalHomework * 10;
    totalPoints += homeworkPoints;
    let grade = 3 + 2 * (totalPoints - maxPoints / 5) / (maxPoints / 2);

    if (examPoints === maxExamPoints) {
        console.log('6.00');
    } else if (grade < 3 || grade > 6) {
        console.log(Math.floor(grade).toFixed(2));
    } else {
        console.log(grade.toFixed(2));
    }
}
