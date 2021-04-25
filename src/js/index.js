import '../css/index.css'
import  testObj from './test';

// 测试 import 导入的变量能否修改
console.log(testObj);
testObj.c.aa = '改变了'
console.log(testObj);


// 注册 serviceWorker， 进行兼容
if ('serviceWorker' in  navigator) {
    console.log('jisnd ');
    window.addEventListener('load', () =>{
        navigator.serviceWorker
                        .register('/service-worker.js')
                        .then(() => {
                            console.log('注册成功')
                        })
                        .catch(() => {
                            console.log('注册失败')
                        })
    })
}