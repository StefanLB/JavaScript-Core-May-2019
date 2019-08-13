function constructionCrew(workerStats) {

    if (workerStats.dizziness === true) {
        workerStats.levelOfHydrated += 0.1 * workerStats.weight * workerStats.experience;
        workerStats.dizziness = false;
    }

    return workerStats;
}
