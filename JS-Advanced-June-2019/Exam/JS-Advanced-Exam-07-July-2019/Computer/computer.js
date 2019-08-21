class Computer {
    constructor(ramMemory, cpuGHz, hddMemory) {
        this.ramMemory = ramMemory;
        this.cpuGHz = cpuGHz;
        this.hddMemory = hddMemory;
        this.taskManager = [];
        this.installedPrograms = [];
        this.totalRamUsage = 0;
        this.totalCpuUsage = 0;
    }

    installAProgram(name, requiredSpace) {

        if (this.hddMemory < requiredSpace) {
            throw new Error('There is not enough space on the hard drive');
        }

        const program = { name, requiredSpace };
        this.installedPrograms.push(program);
        this.hddMemory -= requiredSpace;
        return program;
    }

    uninstallAProgram(name) {
        const findProgram = this.installedPrograms.find((p) => p.name === name);

        if (!findProgram) {
            throw new Error('Control panel is not responding');
        }

        const findIndexProgram = this.installedPrograms.findIndex((p) => p.name === name);
        this.installedPrograms.splice(findIndexProgram, 1);
        this.hddMemory += findProgram.requiredSpace;
        return this.installedPrograms;
    }

    openAProgram(name) {
        const findProgram = this.installedPrograms.find((p) => p.name === name);

        if (!findProgram) {
            throw new Error(`The ${name} is not recognized`);
        }

        const openProgram = this.taskManager.find((p) => p.name === name);

        if (openProgram) {
            throw new Error(`The ${name} is already open`);
        }

        const ramUsage = findProgram.requiredSpace / this.ramMemory * 1.5;
        this.totalRamUsage += ramUsage;

        const cpuUsage = findProgram.requiredSpace / this.cpuGHz / 500 * 1.5;
        this.totalCpuUsage += cpuUsage;

        if (this.totalRamUsage >= 100) {
            throw new Error(`${name} caused out of memory exception`);
        }

        if (this.totalCpuUsage >= 100) {
            throw new Error(`${name} caused out of cpu exception`);
        }

        const program = { name, ramUsage, cpuUsage };
        this.taskManager.push(program);
        return program;
    }

    taskManagerView() {

        if (this.taskManager.length === 0) {
            return 'All running smooth so far';
        }

        const output = [];
        this.taskManager.forEach((p) => {
            output.push(`Name - ${p.name} | Usage - CPU: ${p.cpuUsage.toFixed(0)}%, RAM: ${p.ramUsage.toFixed(0)}%`);
        });

        return output.join('\n');
    }
}
