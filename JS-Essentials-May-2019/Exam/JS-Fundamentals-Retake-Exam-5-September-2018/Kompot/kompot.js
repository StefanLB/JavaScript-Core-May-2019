function kompot(params) {

    let fruitsObj = { 'cherry': 0, 'peach': 0, 'plum': 0, 'rakiya': 0 };
    let weightObj = { 'cherry': 9, 'peach': 140, 'plum': 20, 'rakiya': 0.0002 };
    let neededObj = { 'cherry': 25, 'peach': 2.5, 'plum': 10 };

    params.forEach((tokens) => {
        let [fruit, weightKilos] = tokens.split(' ').filter((x) => x !== '');
        let weightGrams = weightKilos * 1000;

        if (fruitsObj.hasOwnProperty(fruit)) {
            fruitsObj[fruit] += weightGrams;
        } else {
            fruitsObj['rakiya'] += weightGrams;
        }
    });

    let cherryKompots = Math.trunc(fruitsObj.cherry / weightObj.cherry / neededObj.cherry);
    let peachKompots = Math.trunc(fruitsObj.peach / weightObj.peach / neededObj.peach);
    let plumKompots = Math.trunc(fruitsObj.plum / weightObj.plum / neededObj.plum);
    let rakiyaLiters = (fruitsObj.rakiya * weightObj.rakiya).toFixed(2);

    console.log(`Cherry kompots: ${cherryKompots}`);
    console.log(`Peach kompots: ${peachKompots}`);
    console.log(`Plum kompots: ${plumKompots}`);
    console.log(`Rakiya liters: ${rakiyaLiters}`);
}
