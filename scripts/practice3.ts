/// <reference path="../typings/index.d.ts" />

window.onload = function() {
  threeStart();
};


var threeStart = ()=> {
  initThree();
  initCamera();
  initLight();
  initObject();
  draw();
};



var render,
    scene,
    canvasFrame,
    camera;


var initThree = ()=> {
  canvasFrame = document.getElementById('canvas-frame');
  renderer = new THREE.WebGLRenderer({antialias: true});

  renderer.setSize(canvasFrame.clientWidth, canvasFrame.clientHeight);
  canvasFrame.appendChild(renderer.domElement);
  renderer.setClearColor(0x000000, 1.0);
  scene = new THREE.Scene();
};


var cube;
var initObject = ()=> {

  var axisHelper = new THREE.AxisHelper(50);
  scene.add(axisHelper);

  // cube作成
  var geo = new THREE.CubeGeometry(30, 30, 30);
  var material = new THREE.MeshLambertMaterial({color: 0x0000ff});
  cube = new THREE.Mesh(geo, material);
  scene.add(cube);


  // クォータニオン設定

  // cube.useQuaternion = true; -> デフォルトでクォータニオンがtrueだから表示する必要なし。

  // クォータニオンに代入する値二つ。軸と角度。
  var axis = new THREE.Vector3(1, 1, 1);
  axis.normalize();

  var angle = Math.PI/4;

  var q = new THREE.Quaternion();
  q.setFromAxisAngle(axis, angle);
  cube.quaternion.copy(q);

  cube.position.set(0, 0, 0);

};



var initCamera =() => {
  camera = new THREE.PerspectiveCamera(45, canvasFrame.clientWidth/canvasFrame.clientHeight, 1, 10000);
  camera.position.set(50, 50, 100);
  camera.up.set(0, 0, 1);

  camera.lookAt(new THREE.Vector3(0, 0, 0));
  
};

var initLight = () => {
  let directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
  directionalLight.position.set(50, 20, 100);
  scene.add(directionalLight);
};

var draw = () => {
  // loop();
  renderer.clear();
  renderer.render(scene, camera);
};  

var step = 0;
var loop = ()=> {
  step++;
  let rotation = step/100;
  cube.rotation.set(rotation, 0, 0);
  renderer.clear();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};