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
        }, 20);

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
        }, 30);

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



        var ground_material = new BABYLON.StandardMaterial("ground_material", scene);
        ground_material.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.3);
        ground_material.specularColor = new BABYLON.Color3(0.3, 0.3, 0.3);
        ground_material.emissiveColor = new BABYLON.Color3(0, 0, 0);
        ground_material.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);

        var ground = BABYLON.MeshBuilder.CreateBox("ground", {width: 8, height: 0.1, depth: 8}, scene);
        ground.setPositionWithLocalVector( new BABYLON.Vector3(0, -0.05, 0) );
        ground.material = ground_material;
        ground.isPickable = true;

        var num_ground_locators = 24;
        var ground_locators = [];
        for (var i=0; i<num_ground_locators; i++) {
            ground_locators.push(
                BABYLON.MeshBuilder.CreateSphere("ground_locator_"+i, {diameter:0.08}, scene)
            );
            ground_locators[i].material = blue_material_hover;
        }

        var pointerDragBehavior = new BABYLON.PointerDragBehavior({dragPlaneNormal: new BABYLON.Vector3(0,1,0)});
        // Use drag plane in world space
        pointerDragBehavior.useObjectOrientationForDragging = false;

        // Listen to drag events
        pointerDragBehavior.onDragStartObservable.add(function (event) {
            console.log("dragStart", event);
        });
        pointerDragBehavior.onDragObservable.add(function (event) {
            console.log("drag", event);
            // the pointerDragBehavior object is assigning position data to ground_locators[0]
            for (var i=0; i<num_ground_locators-1; i++) {
                ground_locators[i+1].setPositionWithLocalVector( ground_locators[i].absolutePosition );
            }
        });
        pointerDragBehavior.onDragEndObservable.add(function (event) {
            console.log("dragEnd", event);
        });

        ground_locators[0].addBehavior(pointerDragBehavior);

        // This fires on ALL scene UI events
        scene.onPointerObservable.add(function (pointerInfo) {
            switch (pointerInfo.type) {
                case BABYLON.PointerEventTypes.POINTERDOWN:
                    console.log("POINTER DOWN");
                    // See if we clicked on ground + if so move ground_locator
                    if (pointerInfo.pickInfo && pointerInfo.pickInfo.pickedMesh) {
                        // did we hit the ground and do we have a vec3?
                        if (pointerInfo.pickInfo.pickedMesh.name === 'ground' && pointerInfo.pickInfo.pickedPoint) {
                            // Move locator(s) ([0] gets most recent pos, [num_ground_locators-1] is the oldest)
                            // Assign the [0] position to [1] etc...
                            for (var i=0; i<num_ground_locators-1; i++) {
                                ground_locators[i+1].setPositionWithLocalVector( ground_locators[i].absolutePosition );
                            }
                            // Add new pos
                            ground_locators[0].setPositionWithLocalVector( pointerInfo.pickInfo.pickedPoint );

                        }
                    }

                    break;

                case BABYLON.PointerEventTypes.POINTERUP:
                    console.log("POINTER UP");
                    break;

                case BABYLON.PointerEventTypes.POINTERMOVE:
                    console.log("POINTER MOVE", pointerInfo);
                    // Below only works on browsers, not in a VR scene
                    // var pickInfo = scene.pick(pointerInfo.event.x, pointerInfo.event.y);
                    // console.log("pickInfo", pickInfo);
                    // if (pickInfo.hit && pickInfo.pickedMesh.name === 'ground') {
                    //     // Assign the [0] position to [1] etc...
                    //     for (var i=0; i<num_ground_locators-1; i++) {
                    //         ground_locators[i+1].setPositionWithLocalVector( ground_locators[i].absolutePosition );
                    //     }
                    //     // Add new pos
                    //     ground_locators[0].setPositionWithLocalVector( pickInfo.pickedPoint );
                    // }
                    break;

                case BABYLON.PointerEventTypes.POINTERWHEEL:
                    console.log("POINTER WHEEL");
                    break;

                case BABYLON.PointerEventTypes.POINTERPICK:
                    console.log("POINTER PICK");
                    break;

                case BABYLON.PointerEventTypes.POINTERTAP:
                    console.log("POINTER TAP");
                    break;

                case BABYLON.PointerEventTypes.POINTERDOUBLETAP:
                    console.log("POINTER DOUBLE-TAP");
                    break;
            }
        });



        // Async call
        // BABYLON.SceneLoader.Append("https://www.babylonjs.com/Scenes/Mansion/",
        //     "Mansion.babylon", scene, function () {
        //         scene.activeCamera.position = new BABYLON.Vector3(0.4,1.7,-5);
        //         // We will add some logic there
        //         var VRHelper = scene.createDefaultVRExperience();
        //         VRHelper.enableInteractions();
        // });

        scene.activeCamera.position = new BABYLON.Vector3(0,2.0,0); // player's head is 2 meters tall at 0,0

        var vrHelper = scene.createDefaultVRExperience();
        vrHelper.enableInteractions();

        vrHelper.raySelectionPredicate = function (mesh) {
          if (mesh.name.indexOf("ground") !== -1) {
            return true; // The only meshes we care about are those containing "ground" in their names
          }
          return false;
        };

        // This ought to fire on the daydream/oculus controller clicks...
        vrHelper.onNewMeshPicked.add(function (pickInfo) {
            if (pickInfo.pickedMesh.name === 'ground' && pickInfo.pickedPoint) {
                // Move locator(s) ([0] gets most recent pos, [num_ground_locators-1] is the oldest)
                // Assign the [0] position to [1] etc...
                for (var i=0; i<num_ground_locators-1; i++) {
                    ground_locators[i+1].setPositionWithLocalVector( ground_locators[i].absolutePosition );
                }
                // Add new pos
                ground_locators[0].setPositionWithLocalVector( pickInfo.pickedPoint );

            }
        });

        var have_registered_first_vr_controller = false;
        vrHelper.onControllerMeshLoaded.add(function (webVRController) {
            if (!have_registered_first_vr_controller) {
                have_registered_first_vr_controller = true;
                setInterval(function () {
                    var ray = new BABYLON.Ray(webVRController.pointer.absolutePosition, webVRController.pointer.forward, 1000);
                    var pickInfo = scene.pickWithRay(ray);
                    if (pickInfo.pickedMesh.name === 'ground' && pickInfo.pickedPoint) {
                        // Move locator(s) ([0] gets most recent pos, [num_ground_locators-1] is the oldest)
                        // Assign the [0] position to [1] etc...
                        for (var i=0; i<num_ground_locators-1; i++) {
                            ground_locators[i+1].setPositionWithLocalVector( ground_locators[i].absolutePosition );
                        }
                        // Add new pos
                        ground_locators[0].setPositionWithLocalVector( pickInfo.pickedPoint );

                    }
                }, 500);
            }
        });


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


