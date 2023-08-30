window.onload = () => {
    let downloaded = false;

    const cam = document.querySelector("[gps-new-camera]");

    cam.addEventListener("gps-camera-update-position", async(e) => {
        if(!downloaded) {
            const west = e.detail.position.longitude - 0.05,
                  east = e.detail.position.longitude + 0.05,
                  south = e.detail.position.latitude - 0.05,
                  north = e.detail.position.latitude + 0.05;
            console.log(`${west} ${south} ${east} ${north}`);
            const response = await fetch(`https://hikar.org/webapp/map?bbox=${west},${south},${east},${north}&layers=poi&outProj=4326`);
            const pois = await response.json();
            pois.features.forEach ( feature => {
                const compoundEntity = document.createElement("a-entity");
                compoundEntity.setAttribute('gps-new-entity-place', {
                    latitude: feature.geometry.coordinates[1],
                    longitude: feature.geometry.coordinates[0]
                });
                const box = document.createElement("a-box");
                box.setAttribute("scale", {
                    x: 20,
                    y: 20,
                    z: 20
                });
                box.setAttribute('material', { color: 'red' } );
                box.setAttribute("position", {
                    x : 0,
                    y : 50,
                    z: 0
                } );
                const label = document.createElement("a-text");
                const textScale = 100;
                label.setAttribute("look-at", "[gps-new-camera]");
                label.setAttribute("scale", {
                    x: textScale,
                    y: textScale,
                    z: textScale
                });
                label.setAttribute("value", feature.properties.name);
                label.setAttribute("align", "center");
                compoundEntity.appendChild(box);
                compoundEntity.appendChild(label);
                document.querySelector("a-scene").appendChild(compoundEntity);
            });
        }
        downloaded = true;
    });
};