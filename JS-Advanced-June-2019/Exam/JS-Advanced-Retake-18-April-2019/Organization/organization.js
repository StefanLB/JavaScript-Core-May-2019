class Organization {
    constructor(name, budget) {
        this.name = name;
        this.budget = budget;
        this.employees = [];
        this.departmentsBudget = {
            marketing: this.budget * 0.40,
            finance: this.budget * 0.25,
            production: this.budget * 0.35
        }
    }

    get departmentsBudget() {
        return this._departmentsBudget;
    }

    set departmentsBudget(departmentsBudget) {
        this._departmentsBudget = departmentsBudget;
    }

    add(employeeName, department, salary) {

        if (this.departmentsBudget[department] < salary) {
            return `The salary that ${department} department can offer to you Mr./Mrs. ${employeeName} is $${this.departmentsBudget[department]}.`;
        }

        const employee = { employeeName, department, salary };
        this.employees.push(employee);
        this.departmentsBudget[department] -= salary;
        return `Welcome to the ${department} team Mr./Mrs. ${employeeName}.`;
    }

    employeeExists(employeeName) {
        const filtered = this.employees.filter((e) => e.employeeName === employeeName);

        if (filtered.length === 0) {
            return `Mr./Mrs. ${employeeName} is not working in ${this.name}.`;
        }

        return `Mr./Mrs. ${employeeName} is part of the ${filtered[0].department} department.`;
    }

    leaveOrganization(employeeName) {
        const filtered = this.employees.filter((e) => e.employeeName === employeeName);

        if (filtered.length === 0) {
            return `Mr./Mrs. ${employeeName} is not working in ${this.name}.`;
        }

        this.employees = this.employees.filter((e) => e.employeeName !== employeeName);
        this.departmentsBudget[filtered[0].department] += filtered[0].salary;
        return `It was pleasure for ${this.name} to work with Mr./Mrs. ${employeeName}.`;
    }

    status() {
        const marketings = this.employees.filter((x) => x.department === 'marketing');
        const finances = this.employees.filter((x) => x.department === 'finance');
        const productions = this.employees.filter((x) => x.department === 'production');

        const marketingEmployees = marketings.sort((a, b) => b.salary - a.salary).map((x) => x.employeeName).join(', ');
        const financeEmployees = finances.sort((a, b) => b.salary - a.salary).map((x) => x.employeeName).join(', ');
        const productionEmployees = productions.sort((a, b) => b.salary - a.salary).map((x) => x.employeeName).join(', ');

        const output = [`${this.name.toUpperCase()} DEPARTMENTS:`];
        output.push(`Marketing | Employees: ${marketings.length}: ${marketingEmployees} | Remaining Budget: ${this.departmentsBudget.marketing}`);
        output.push(`Finance | Employees: ${finances.length}: ${financeEmployees} | Remaining Budget: ${this.departmentsBudget.finance}`);
        output.push(`Production | Employees: ${productions.length}: ${productionEmployees} | Remaining Budget: ${this.departmentsBudget.production}`);
        return output.join('\n');
    }
}
