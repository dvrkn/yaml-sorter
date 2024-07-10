// NO LLM WAS HARMED IN THE MAKING OF THIS CODE
//
// This is a simple yaml sorter that sorts yaml files based on a predefined order of keys
//
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { program } from "commander";

// The order of keys having precedence
//

// load config from file
const config = yaml.load(fs.readFileSync('config.yaml', 'utf8'));
const preOrder = config.preOrder;
const arraySortKey = config.arraySortKey;

// Array sort function
// The sort based on the arraySortKey
//
function replacer(key, value) {
    if (Array.isArray(value)) {
        if (value.length > 0) {
            value.sort((a, b) => {
                if (! a.hasOwnProperty(arraySortKey)) return 1;
                if (! b.hasOwnProperty(arraySortKey)) return -1;

                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;

                return 0;
            });
        }
    }

    return value;
}

// Yaml key sort function
// The sort based on the preOrder array
//
function sortKeys(a, b) {
    if (preOrder.indexOf(a) !== -1 && preOrder.indexOf(b) !== -1) {
        if (preOrder.indexOf(a) > preOrder.indexOf(b)) return 1;
        if (preOrder.indexOf(a) < preOrder.indexOf(b)) return -1;
        return 0;
    }

    if (preOrder.indexOf(a) !== -1) return -1;
    if (preOrder.indexOf(b) !== -1) return 1;

    if (a < b) return -1;
    if (a > b) return 1;

    return 0;
}

function sortYaml(filePath, options) {
    const file = fs.readFileSync(filePath, 'utf8');
    const data = yaml.load(file);
    // Dump the yaml file to same file

    if (options.inplace) {
        fs.writeFileSync(filePath, yaml.dump(data, {
            replacer: (key, value) => replacer(key, value),
            sortKeys: (a, b) => sortKeys(a, b)
        }));
    } else {
        console.log(yaml.dump(data, {
            replacer: (key, value) => replacer(key, value),
            sortKeys: (a, b) => sortKeys(a, b)
        }));
    }
}

program
    .version("1.0.0")
    .description("Yaml sorter by @dvrkn")
    .argument('<string>', 'path to the yaml file')
    .option('-i, --inplace', 'sort the yaml file in place')
    .action(sortYaml);

program.parse();
