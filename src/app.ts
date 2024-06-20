// NO LLM WAS HARMED IN THE MAKING OF THIS CODE
//
// This is a simple yaml sorter that sorts yaml files based on a predefined order of keys
//
import * as fs from 'fs';
import * as yaml from 'js-yaml';

const file = fs.readFileSync('test.yaml', 'utf8');
const data = yaml.load(file);

// The order of keys having precedence
//
const preOrder = [
    'enabled',
    'apiVersion',
    'kind',
    'metadata',
    'name',
    'namespace',
    'labels',
    'annotations',
    'goTemplate',
    'generators',
    'spec',
    'containers',
    'image',
    'ports',
    'protocol',
    'resources',
    'limits',
    'requests',
    'cpu',
    'memory',
    'volumeMount',
    'destination',
    'sources',
];

// The key to sort the array
//
const arraySortKey='name'

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

// Dump the yaml file
//
console.log(yaml.dump(data, {
    replacer: (key, value) => replacer(key, value),
    sortKeys: (a, b) => sortKeys(a, b)
}));
