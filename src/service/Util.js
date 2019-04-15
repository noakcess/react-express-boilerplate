/*eslint-disable no-unused-vars*/

import { moment, momentDur } from 'Service/Common';
import { propertyOf, debounce } from 'underscore';
import sha256 from 'sha256';
import md5 from 'md5';
import { Promise, Log, FormService } from 'Service/Common';

// const config = FormService.config;
// const Log = window.Log;

const Util = {
    ucfirst: (str = '') => { return str.charAt(0).toUpperCase() + str.slice(1); },
    formatDate(date = '', format = 'MM/DD/YYYY') {
        return (typeof(date) === 'string' && date.length > 0 ? moment(date).format(format) : date);
    },
    generateColor: (str = false) => {
        let rgb = [ 0, 0, 0 ];
        if (str) {
            const current = md5(str).replace(/[a-z]/ig, '').toString();
            let encoded = sha256.x2(str);
            let index = 0;
            let prev = 10;
            encoded.split('').map((x, i ) => {
                if (index === 3) index = 0;
                let vowel = !x.toString().search(/(a|e|i|o|u)/ig);
                let multiple = x.toString().search(/(b|d|f|h|j|l|n|p|r|t|v|x|z)/ig) !== -1 ? 2 : 1;
                let val = parseInt(x) || prev;
                rgb[index] = parseInt(rgb[index]) + ( vowel ? - ( val * multiple ) : ( val * multiple ));
                prev = val;
                index++;
                return true;
            });
            rgb[0] -= parseInt(current.substring(0, 2));
            rgb[1] -= parseInt(current.substring(2, 4));
            rgb[2] -= parseInt(current.substring(4, 6));
            
        } else rgb = [ 255, 255, 255 ];
        
        return `rgb(${rgb.join(', ')})`;
    }
};

export default Util;

