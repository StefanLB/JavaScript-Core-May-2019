function gladiatorExpenses(arg1, arg2, arg3, arg4, arg5) {
    let [gamesCount, helmetPrice, swordPrice, shieldPrice, armorPrice] =
        [Number(arg1), Number(arg2), Number(arg3), Number(arg4), Number(arg5)];

    let helmetSum = Math.trunc(gamesCount / 2) * helmetPrice;
    let swordSum = Math.trunc(gamesCount / 3) * swordPrice;
    let shieldSum = Math.trunc(gamesCount / 6) * shieldPrice;
    let armorSum = Math.trunc(gamesCount / 12) * armorPrice;
    let cost = helmetSum + swordSum + shieldSum + armorSum;

    console.log(`Gladiator expenses: ${cost.toFixed(2)} aureus`);
}
