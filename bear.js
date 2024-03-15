console.log("wadwad")

let app = new PIXI.Application({ width: window.innerWidth, height: window.outerHeight, transparent: true });
let armatureDisplay = null;
let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite


PIXI.loader
    .add('./json/Bear_tex.png')
    .load(init);

function init() {
    let textureImg = resources['./json/Bear_tex.png'].texture; 
    let textureData = './json/Bear_tex.json'
    let skeletonData = './json/Bear_ske.json' 
    let getTextureData = fetch('./json/Bear_tex.json').then(r => r.text()).then(res => {
        textureData = res;
        console.log(res)
        return res;
    });

    let getSkeletonData = fetch('./json/Bear_ske.json').then(r => r.text()).then(res => {
        skeletonData = res;
        console.log(res)
        return res
    });

    Promise.all([getSkeletonData, getTextureData]).then(res => {
        console.log(res, skeletonData, textureData)
        let factory = new dragonBones.PixiFactory();
        factory.parseDragonBonesData(JSON.parse(skeletonData));
        factory.parseTextureAtlasData(JSON.parse(textureData), textureImg);
        armatureDisplay = factory.buildArmatureDisplay("Armature")
        armatureDisplay.animation.play('handShake');

        var w = window.innerWidth;
        var h = window.innerHeight;
        armatureDisplay.position.set(w - 120, h - 5)
        armatureDisplay.scale.set(0.2)
        console.log(armatureDisplay)

        let container = new PIXI.Sprite();
        armatureDisplay.interactive = true;
        // Shows hand cursor
        armatureDisplay.buttonMode = true;
        
        
        armatureDisplay.on('mousedown', (event)=>{
            armatureDisplay.data = event.data
            armatureDisplay.dragging = true
            armatureDisplay.offset_x = armatureDisplay.data.getLocalPosition(armatureDisplay.parent).x - armatureDisplay.position._x
            armatureDisplay.offset_y = armatureDisplay.data.getLocalPosition(armatureDisplay.parent).y - armatureDisplay.position._y
        }).on('mousemove', (event)=>{
           if (armatureDisplay.dragging) {
            const newPosition = armatureDisplay.data.getLocalPosition(armatureDisplay.parent)
            armatureDisplay.position.x = newPosition.x - armatureDisplay.offset_x
            armatureDisplay.position.y = newPosition.y - armatureDisplay.offset_y
        }
        }).on('mouseup',  (event)=>{
            armatureDisplay.dragging = false
         })
        // app.view.addEventListener('mousemove',(e)=> {
        //     console.log('move',event,armatureDisplay) 
        //     e.stopPropagation()
        // })
        // container.addChild(armatureDisplay)
        app.stage.addChild(armatureDisplay)
        document.body.appendChild(app.view);
    })
}


window.onresize = function (event) {
    var w = window.innerWidth;
    var h = window.innerHeight;

    //this part resizes the canvas but keeps ratio the same
    app.view.style.width = w + "px";
    app.view.style.height = h + "px";

    //this part adjusts the ratio:
    // console.log(app.renderer)

    resizeBear()
    
    app.renderer.autoResize = true;
    app.renderer.resize(w, h);
}

function resizeBear() {
    if(!armatureDisplay) return
    var w = window.innerWidth;
    var h = window.innerHeight;
    console.log(w,h)
    armatureDisplay.position.set(w - 120, h - 5)
}