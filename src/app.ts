// Read test.yaml using js-yaml in typescript
import * as fs from 'fs';
import * as yaml from 'js-yaml';

const file = fs.readFileSync('test.yaml', 'utf8');
const data = yaml.load(file);

function sortKeys(a, b) {
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

    if (preOrder.indexOf(a) != -1) {
        if (preOrder.indexOf(b) != -1) {
            if (preOrder.indexOf(a) > preOrder.indexOf(b)) {
                return 1;
            }
            if (preOrder.indexOf(a) < preOrder.indexOf(b)) {
                return -1;
            }
        } else {
            if (a > b) {
                return 1;
            }
            if (a < b) {
                return -1;
            }
            return 0;
        }
    } else {
        if (preOrder.indexOf(b) != -1) {
            return 1;
        } else {
            return -1;
        }
    }
}

console.log(yaml.dump(data, {
    sortKeys:
        (a, b) => sortKeys(a, b)
}));
