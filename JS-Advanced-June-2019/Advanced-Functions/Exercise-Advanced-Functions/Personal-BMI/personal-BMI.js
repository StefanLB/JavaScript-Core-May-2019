function personalBMI() {
    const getBMI = function () {
        const [weightKg, heightM] = arguments;
        return Math.round(weightKg / heightM ** 2);
    };

    const getStatus = function () {
        const bmi = arguments[0];
        if (bmi < 18.5) {
            return 'underweight';
        } else if (bmi < 25) {
            return 'normal';
        } else if (bmi < 30) {
            return 'overweight';
        } else if (bmi >= 30) {
            return 'obese';
        }
    };

    const [name, age, weightKg, heightCm] = arguments;

    const bmi = getBMI(weightKg, heightCm / 100);
    const status = getStatus(bmi);

    const patientInfo = {
        name,
        personalInfo: {
            age,
            weight: weightKg,
            height: heightCm
        },
        BMI: bmi,
        status
    };

    if (patientInfo.status === 'obese') {
        patientInfo.recommendation = 'admission required';
    }

    return patientInfo;
}
