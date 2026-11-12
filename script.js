function createPet(name) {
    let satiety = 10;
    let mood = 10;

    return function pet(command, hours = 1) {
        satiety = clamp(satiety - 1);

        if (satiety === 0) {
            return `${name} got offended and left 😿`;
        }

        switch (command) {
            case 'feed':
                satiety = clamp(satiety + 3);
                break;
            case 'play':
                mood = clamp(mood + 3);
                break;
            case 'sleep':
                sleep(hours);
                mood = clamp(mood + hours);
                break;
            case 'status':
                break;
            default:
                return `${name} doesn't understand "${command}"`;
        }

        const emoji = mood >= 7 ? '😺' : mood >= 4 ? '😐' : '😿';
        return `${name} ${emoji}: satiety ${satiety}, mood ${mood}`;
    };
}

function clamp(value, min = 0, max = 10) {
    if (value < min) {
        return min;
    }
    else if (value > max) {
        return max;
    }
    return value;
}

function sleep(hours) {
    if (hours > 0) {
        alert('Zzz...');
        sleep(hours - 1);
    }
}

function stats(name, ...values) {
    alert(`${name}\nAll commands: ${values.join(", ")}\nTurns lived: ${values.length}`);
}

const barsik = createPet('Barsik');
const murzik = createPet('Murzik');

const barsikCommands = [];
const murzikCommands = [];

let current = barsik;
let currentName = 'Barsik';
let currentCommands = barsikCommands;

while (true) {
    const choice = prompt(`Pet: ${currentName}\n1 — feed\n2 — play\n3 — status\n4 — switch pet\n5 — sleep\n0 — exit`);

    if (choice === "0" || choice === null) {
        stats("Barsik", ...barsikCommands);
        stats("Murzik", ...murzikCommands);
        break;
    }

    let command;
    let hours = 1;

    switch (choice) {
        case "1":
            command = 'feed';
            currentCommands.push(command);
            break;
        case "2":
            command = 'play';
            currentCommands.push(command);
            break;
        case "3":
            command = 'status';
            currentCommands.push(command);
            break;
        case "4":
            if (current === barsik) {
                current = murzik;
                currentName = 'Murzik';
                currentCommands = murzikCommands;
            } else {
                current = barsik;
                currentName = 'Barsik';
                currentCommands = barsikCommands;
            }
            continue;
        case "5":
            command = 'sleep';
            hours = Number(prompt("How many hours?")) || 1;
            currentCommands.push(command);
            break;
        default:
            command = choice;
    }

    alert(current(command, hours));
}