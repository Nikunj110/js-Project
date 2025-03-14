const xhr =new XMLHttpRequest();

xhr.addEventListener('load',()=>{
    console.log(xhr.response);
});
xhr.open('GET','https://supersimplebackend.dev/products/first');
xhr.send();
// const y = xhr.response;
// console.log('fefefefew');

// console.log(y);