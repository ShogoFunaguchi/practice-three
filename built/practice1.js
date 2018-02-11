/// <reference path="../typings/index.d.ts" />
window.onload = function () {
    threeStart();
};
var threeStart = function () {
    initThree();
    initCamera();
    initObject();
    draw();
};
var renderer, scene, canvasFrame;
var initThree = function () {
    canvasFrame = document.getElementById('canvas-frame');
    renderer = new THREE.WebGLRenderer({ antialias: true });
    if (!renderer) {
        alert('Three.jsの初期化に失敗しました。');
    }
    renderer.setSize(canvasFrame.clientWidth, canvasFrame.clientHeight);
    canvasFrame.appendChild(renderer.domElement);
    renderer.setClearColor(0x000000, 1.0);
    scene = new THREE.Scene();
};
var axis;
var initObject = function () {
    // AxisHelper -> AxesHelper;
    axis = new THREE.AxesHelper(50);
    scene.add(axis);
    axis.position.set(0, 0, 0);
};
var camera;
var initCamera = function () {
    camera = new THREE.PerspectiveCamera(45, canvasFrame.clientWidth / canvasFrame.clientHeight, 1, 10000);
    camera.position.set(50, 50, 100);
    camera.up.set(0, 0, 1);
    // カメラの向き先はvector3で指定しないとダメ。
    camera.lookAt(new THREE.Vector3(0, 0, 0));
};
var draw = function () {
    renderer.clear();
    renderer.render(scene, camera);
};
