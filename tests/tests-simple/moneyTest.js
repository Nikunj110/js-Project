import {formatcurrency } from '../../scripts/utils/money.js';
if(formatcurrency(2000)==='20.00'){
    console.log('YES');
}else{
    console.log('NO');

}

if(formatcurrency(0)==='0.00'){
    console.log('YES');
}else{
    console.log('NO');

}
if(formatcurrency(2095)==='20.95'){
    console.log('YES');
}else{
    console.log('NO');

}

if(formatcurrency(2000.5)==='20.01'){
    console.log('YES');
}else{
    console.log('NO');

}
