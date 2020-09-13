function main() {
    var canvas = document.getElementById("canvas"); // Get the canvas element
    var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

    /******* Add the create scene function ******/
    var createScene = function () {

        // Create the scene space
        var scene = new BABYLON.Scene(engine);

        // Add a camera to the scene and attach it to the canvas
        //var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0,0,5), scene);
        //camera.attachControl(canvas, true);
        var camera = new BABYLON.Camera("camera1", BABYLON.Vector3.Zero(), scene);

        // Add lights to the scene
        var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
        var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

        var blue_material = new BABYLON.StandardMaterial("blue_material", scene);
        blue_material.diffuseColor = new BABYLON.Color3(0, 0, 1);
        blue_material.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
        blue_material.emissiveColor = new BABYLON.Color3(0, 0, 0);
        blue_material.ambientColor = new BABYLON.Color3(0.23, 0.53, 0.98);

        var blue_material_hover = new BABYLON.StandardMaterial("blue_material_hover", scene);
        blue_material_hover.diffuseColor = new BABYLON.Color3(0.2, 0.2, 1);
        blue_material_hover.specularColor = new BABYLON.Color3(0.8, 0.9, 1.0);
        blue_material_hover.emissiveColor = new BABYLON.Color3(0, 0, 0);
        blue_material_hover.ambientColor = new BABYLON.Color3(0.4, 0.7, 1.0);

        // Add and manipulate meshes in the scene
        var sphere1 = BABYLON.MeshBuilder.CreateSphere("sphere1", {diameter:0.4}, scene);
        sphere1.material = blue_material;
        // Animate sphere inefficiently
        setInterval(function () {
            var now_ms = Date.now() - 1300;
            // sphere2 is a function of time and repeats every 3 seconds
            var height_m = 0.75 + (Math.sin(now_ms / 4000) * 0.70);
            //console.log("now_ms", now_ms, "height_m", height_m);
            sphere1.setPositionWithLocalVector( new BABYLON.Vector3(2.0, height_m, 2.0) );
        }, 60);

        let actionManager = new BABYLON.ActionManager(scene);
        sphere1.actionManager = actionManager;

        actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function(ev){
            //scene.beginAnimation(sphere1, 0, 10, false);
            sphere1.material = blue_material_hover;
        }));
        actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function(ev){
            //scene.beginAnimation(sphere1, 10, 0, false);
            sphere1.material = blue_material;
        }));


        var red_material = new BABYLON.StandardMaterial("red_material", scene);
        red_material.diffuseColor = new BABYLON.Color3(1, 0, 0);
        red_material.specularColor = new BABYLON.Color3(0.87, 0.6, 0.5);
        red_material.emissiveColor = new BABYLON.Color3(0, 0, 0);
        red_material.ambientColor = new BABYLON.Color3(0.98, 0.53, 0.23);

        var red_material_hover = new BABYLON.StandardMaterial("red_material_hover", scene);
        red_material_hover.diffuseColor = new BABYLON.Color3(1, 0.2, 0.2);
        red_material_hover.specularColor = new BABYLON.Color3(1.0, 0.9, 0.8);
        red_material_hover.emissiveColor = new BABYLON.Color3(0, 0, 0);
        red_material_hover.ambientColor = new BABYLON.Color3(1.0, 0.7, 0.4);


        var sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere2", {diameter:0.8}, scene);
        sphere2.material = red_material;
        // Animate sphere inefficiently
        setInterval(function () {
            var now_ms = Date.now();
            // sphere2 is a function of time and repeats every 3 seconds
            var height_m = 0.75 + (Math.sin(now_ms / 5000) * 0.70);
            //console.log("now_ms", now_ms, "height_m", height_m);
            sphere2.setPositionWithLocalVector( new BABYLON.Vector3(-2.0, height_m, 2.0) );
        }, 60);


        let actionManager2 = new BABYLON.ActionManager(scene);
        sphere2.actionManager = actionManager2;

        actionManager2.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function(ev){
            //scene.beginAnimation(sphere2, 0, 10, false);
            sphere2.material = red_material_hover;
        }));
        actionManager2.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function(ev){
            //scene.beginAnimation(sphere2, 10, 0, false);
            sphere2.material = red_material;
        }));

        var ground = BABYLON.MeshBuilder.CreateBox("ground", {width: 8, height: 0.1, depth: 8}, scene);
        ground.setPositionWithLocalVector( new BABYLON.Vector3(0, -0.05, 0) );
        ground.background = "grey";

        // Async call
        // BABYLON.SceneLoader.Append("https://www.babylonjs.com/Scenes/Mansion/",
        //     "Mansion.babylon", scene, function () {
        //         scene.activeCamera.position = new BABYLON.Vector3(0.4,1.7,-5);
        //         // We will add some logic there
        //         var VRHelper = scene.createDefaultVRExperience();
        //         VRHelper.enableInteractions();
        // });

        scene.activeCamera.position = new BABYLON.Vector3(0,1.0,0); // player's head is 1 meter tall at 0,0

        var VRHelper = scene.createDefaultVRExperience();
        VRHelper.enableInteractions();


        return scene;
    };
    /******* End of the create scene function ******/

    var scene = createScene(); //Call the createScene function

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {
            scene.render();
    });

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
            engine.resize();
    });
}

document.addEventListener("DOMContentLoaded", main);

