function addAndRemoveElements(params) {
    const output = params
        .reduce((accumulator, command, index) => {

            if (command === 'add') {
                accumulator.push(index + 1);
            } else if (command === 'remove') {
                accumulator.pop();
            }

            return accumulator;
        }, []);

    console.log(output.length > 0 ? output.join('\n') : 'Empty');
}
