import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'


//Loading
const textureLoader = new THREE.TextureLoader() //generation d'une nouvelle texture pour la sphere

const normalTexture = textureLoader.load('/textures/NormalMap.png') //link la texture

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const geometry = new THREE.SphereBufferGeometry(.5, 64, 64); //créer une sphere de radius 0.5 et de segments 64

// Materials

const material = new THREE.MeshStandardMaterial() //Utilisation d'un Mesh Standard au lieu du basic
material.metalness = 0.7 //regle intensite matiere metal
material.roughness = 0.2 //regle intensite brillance
material.normalMap = normalTexture;

material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

//light1
const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

//light2
const pointLight2 = new THREE.PointLight(0x52057b, 2)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
pointLight2.position.set(-1.9,1,-1.6)
pointLight2.intensity = 10

scene.add(pointLight2)

// const light1 = gui.addFolder('Light1') //génere un onglet light1 dans l'ui
//
// light1.add(pointLight2.position, 'y').min(-3).max(3).step(0.01) //ajoute un selecteur de valeur dans la scene pour la light et son placement en y
// light1.add(pointLight2.position, 'x').min(-6).max(6).step(0.01) //ajoute un selecteur de valeur dans la scene pour la light et son placement en x
// light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01) //ajoute un selecteur de valeur dans la scene pour la light et son placement en z
// light1.add(pointLight2, 'intensity').min(0).max(10).step(0.01) //ajoute un selecteur de valeur dans la scene pour l'intensité de la light

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1) //génere la vision du spot light
// scene.add(pointLightHelper)

//light3

const pointLight3 = new THREE.PointLight(0x9659, 2)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
pointLight3.position.set(3.18,-3,-3.02)
pointLight3.intensity = 1.7

scene.add(pointLight3)

// const light2 = gui.addFolder('Light2') //génere un onglet light2 dans l'ui
//
// light2.add(pointLight3.position, 'y').min(-3).max(3).step(0.01) //ajoute un selecteur de valeur dans la scene pour la light et son placement en y
// light2.add(pointLight3.position, 'x').min(-6).max(6).step(0.01) //ajoute un selecteur de valeur dans la scene pour la light et son placement en x
// light2.add(pointLight3.position, 'z').min(-3).max(3).step(0.01) //ajoute un selecteur de valeur dans la scene pour la light et son placement en z
// light2.add(pointLight3, 'intensity').min(0).max(10).step(0.01) //ajoute un selecteur de valeur dans la scene pour l'intensité de la light

// const light2Color = {
//     color: 0x892cdc
// }
//
// light2.addColor(light2Color, 'color')
//     .onChange(() => {
//         pointLight3.color.set(light2Color.color)
//     })

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1) //génere la vision du spot light
// scene.add(pointLightHelper2)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true //permet de mettre le background transparent dans la scene et de le custom dans le css
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}

const updateSphere = (event) => {
    sphere.position.y = window.scrollY * .001
}

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)


    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()