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


var renderer,
    scene,
    canvasFrame;

var initThree = ()=> {
  canvasFrame = document.getElementById('canvas-frame');
  renderer = new THREE.WebGLRenderer({antialias: true});
  if (!renderer) {
    alert('Three.jsの初期化に失敗しました。')
  }

  renderer.setSize(canvasFrame.clientWidth, canvasFrame.clientHeight);

  canvasFrame.appendChild(renderer.domElement);

  renderer.setClearColor(0x000000, 1.0);

  scene = new THREE.Scene();

};

var axis,
    cubes=[];

var initObject = ()=> {

  var axis = new THREE.AxisHelper(50);
  scene.add(axis);
  // cube1 red
  var geo = new THREE.CubeGeometry(20, 20, 20);
  var material = new THREE.MeshLambertMaterial({color: 0xff0000});
  cubes[0] = new THREE.Mesh(geo, material);
  scene.add(cubes[0]);
  cubes[0].position.set(0, -30, 0);

  // cube2 green
  material = new THREE.MeshLambertMaterial({color: 0x00ff00});
  cubes[1] = new THREE.Mesh(geo, material);
  scene.add(cubes[1]);
  cubes[1].position.set(0, 0, 0);

  // cube3 blue
  material =new THREE.MeshLambertMaterial({color: 0x0000ff});
  cubes[2] = new THREE.Mesh(geo, material);
  scene.add(cubes[2]);
  cubes[2].position.set(0, 30, 0);

};


var camera;
var initCamera = ()=> {
  camera = new THREE.PerspectiveCamera(45, canvasFrame.clientWidth / canvasFrame.clientHeight, 1, 10000);
  camera.position.set(50, 50, 100);
  camera.up.set(0, 0, 1);

  // カメラの向き先はvector3で指定しないとダメ。
  camera.lookAt(new THREE.Vector3(0, 0, 0));
};


var initLight = ()=> {
  let directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
  directionalLight.position.set(50, 20, 100);
  scene.add(directionalLight);
};

var draw = ()=> {
  loop();
};


var step = 0;
var loop = ()=> {
  step++;
  let rotation = step/100;
  cubes[0].rotation.set(-rotation,0,0);
  cubes[1].rotation.set(0,rotation,0);
  cubes[2].rotation.set(0,0,rotation);
  renderer.clear();
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
};